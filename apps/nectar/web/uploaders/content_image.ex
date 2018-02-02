defmodule Nectar.ContentImage do
  use Arc.Definition

  @versions [:original, :mobile]

  def acl(:mobile, _), do: :public_read

  def __storage, do: Arc.Storage.S3

  # To add a thumbnail version:
  # @versions [:original, :thumb]

  # Whitelist file extensions:
  def validate({file, _}) do
    ~w(.jpg .jpeg .gif .png) |> Enum.member?(Path.extname(file.file_name))
  end

  def transform(:mobile, _) do
    {:convert, "-strip -gravity center -resize 420x -format png", :png}
  end
  
  # Override the persisted filenames:
  def filename(version, {file, _}) do
    file_name = Path.basename(file.file_name, Path.extname(file.file_name)) 
    "#{file_name}_#{version}"
  end

  def filename(version, _) do
    version
  end

  # Override the storage directory:
  def storage_dir(version, {file, id}) do
    "content/#{id}"
  end

  # Provide a default URL if there hasn't been a file uploaded
  # def default_url(version, scope) do
  #   "/images/avatars/default_#{version}.png"
  # end

  # Specify custom headers for s3 objects
  # Available options are [:cache_control, :content_disposition,
  #    :content_encoding, :content_length, :content_type,
  #    :expect, :expires, :storage_class, :website_redirect_location]
  #
  # def s3_object_headers(version, {file, scope}) do
  #   [content_type: Plug.MIME.path(file.file_name)]
  # end
end

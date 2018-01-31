defmodule Nectar.Uploader.ProductImage do
  use Arc.Definition
  use Arc.Ecto.Definition

  @versions [:original, :thumb]
  @extension_whitelist ~w(.jpg .jpeg .gif .png)

  #def __storage, do: Arc.Storage.S3
  def __storage, do: Arc.Storage.Local

  def acl(:thumb, _), do: :public_read

  def validate({file, _}) do
    file_extension = file.file_name |> Path.extname |> String.downcase
    Enum.member?(@extension_whitelist, file_extension)
  end

  def transform(:thumb, _) do
    {:convert, "-thumbnail 100x100^ -gravity center -extent 100x100 -format png"}
  end

  def filename(version, {%{file_name: file_name}, _model}) do
    file_name 
      |> String.split(".")
      |> Enum.at(0)
      |> Kernel.<>("_#{version}")
  end

  def filename(version, {%Arc.File{file_name: file_name}, _model}) do
    file_name 
      |> String.split(".")
      |> Enum.at(0)
      |> Kernel.<>("_#{version}")
  end

  def storage_dir(_, {_file, product_image}) do
    "uploads/product_images/#{product_image.product_id}"
  end

  def default_url(:thumb) do
    "https://placehold.it/100x100"
  end
end

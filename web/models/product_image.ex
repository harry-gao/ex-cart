defmodule Nectar.ProductImage do
  use Nectar.Web, :model
  use Arc.Ecto.Schema
  
  schema "product_images" do
    field :image, Nectar.Uploader.ProductImage.Type
    belongs_to :product, Nectar.Product, foreign_key: :product_id

    field :delete, :boolean, virtual: true, default: false

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:image])
    |> validate_required([:image])
  end

  def from_product_changeset(model, product, params \\ %{}) do
    model
    |> struct(%{product_id: product.id})
    |> cast(params, ~w(delete))
    |> cast_attachments(params, ~w(image))
    |> set_delete_action
  end

  def set_delete_action(changeset) do
    if get_change(changeset, :delete) do
      %{changeset| action: :delete}
    else
      changeset
    end
  end
end

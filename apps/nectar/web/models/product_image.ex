defmodule Nectar.ProductImage do
  use Nectar.Web, :model
  use Arc.Ecto.Schema
  
  schema "product_images" do
    field :image, Nectar.Uploader.ProductImage.Type
    belongs_to :product, Nectar.Product, foreign_key: :product_id

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
    |> cast_attachments(params, ~w(image))
    # cast(model, params, ~w(category_id), ~w(delete))
    # |> set_delete_action
    # |> unique_constraint(:category_id, name: :unique_product_category)
  end
end

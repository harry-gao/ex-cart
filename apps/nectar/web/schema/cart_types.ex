defmodule Nectar.Schema.CartTypes do
  use Absinthe.Schema.Notation

  use Absinthe.Ecto, repo: Nectar.Repo
  import Ecto.Query

  input_object :cart_input do
    field :variant_id, non_null(:id)
    field :count, non_null(:integer)
  end

  object :cart do
    field :items, list_of[:cart_item]
    field :total_amount, :integer
  end


  object :cart_item do
    field :variant_id, :id
    field :name, :string
    field unit_price, :integer
  end
end
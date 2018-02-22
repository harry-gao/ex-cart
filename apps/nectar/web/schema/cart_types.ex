defmodule Nectar.Schema.CartTypes do
  use Absinthe.Schema.Notation

  use Absinthe.Ecto, repo: Nectar.Repo
  import Ecto.Query
  alias Nectar.Resolvers

  object :cart do
    field :count, :integer do
      resolve &Resolvers.Cart.cart_item_count/3
    end

    field :items, list_of(:cart_item) do
      resolve &Resolvers.Cart.cart_items/3
    end
  end


  object :cart_item do
    field :variant_id, :integer do
      resolve fn p, _, _ ->
        {:ok, p[:variant_id]}
      end
    end
    field :name, :string do
      resolve fn p, _, _ ->
        {:ok, p[:name]}
      end
    end
    field :count, :integer do
      resolve fn p, _, _ ->
        {:ok, p[:count]}
      end
    end
    field :unit_price, :integer do
      resolve fn p, _, _ ->
        {:ok, p[:price]}
      end
    end
    field :image, :string do
      resolve fn p, _, _ -> 
        {:ok, p[:image]} 
      end
    end
  end
end
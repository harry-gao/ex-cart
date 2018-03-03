defmodule Nectar.Schema.CartTypes do
  use Absinthe.Schema.Notation

  use Absinthe.Ecto, repo: Nectar.Repo
  import Ecto.Query
  alias Nectar.Resolvers

  object :cart do
    field :count, :integer do
      resolve &Resolvers.Cart.line_item_count/3
    end

    field :items, list_of(:line_item) do
      resolve &Resolvers.Cart.line_items/3
    end
  end


  object :line_item do
    field :id, :integer do
      resolve fn p, _, _ ->
        {:ok, p[:id]}
      end
    end
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
    field :quantity, :integer do
      resolve fn p, _, _ ->
        {:ok, p[:quantity]}
      end
    end
    field :price, :integer do
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
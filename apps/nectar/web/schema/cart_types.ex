defmodule Nectar.Schema.CartTypes do
  use Absinthe.Schema.Notation

  use Absinthe.Ecto, repo: Nectar.Repo
  import Ecto.Query

  input_object :cart_input do
    field :variant_id, non_null(:integer)
    field :count, non_null(:integer)
  end

  object :cart do
    field :items, list_of(:cart_item) do
      resolve fn p, _, _ ->
        {:ok, p[:items]}
      end
    end
    field :total_amount, :float do
      resolve fn p, _, _ ->
        {:ok, p[:total]}
      end
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
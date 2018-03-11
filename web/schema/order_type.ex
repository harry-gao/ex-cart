defmodule Nectar.Schema.OrderTypes do
  use Absinthe.Schema.Notation

  use Absinthe.Ecto, repo: Nectar.Repo
  import Ecto.Query

  object :order do
    field :id, :integer
    field :state, :string
    field :items, list_of(:line_item) do
      resolve &Nectar.Resolvers.Order.line_items/3
    end
    field :address, :address do
      resolve fn parent, _, _ ->
        {:ok, parent.shipping_address}
      end
    end
  end
end
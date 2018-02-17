defmodule Nectar.Resolvers.Cart do
  import Ecto.Query, only: [from: 2]

  #args = [%{variant_id: 27, count: 2}, %{variant_id: 28, count: 4}]
  def cart_summary(_parent, args, _resolution) do
    ids = args |> Enum.map(&(&1[:variant_id]))

    query = from v in Nectar.Variant,
              join: p in Nectar.Product,
              where: v.product_id == p.id,
            where: v.id in ^ids,
            select: {v.id, v.cost_price, p.name}
    {:ok, Nectar.Repo.all(query)}
  end

end
defmodule Nectar.Resolvers.Cart do
  import Ecto.Query, only: [from: 2]

  #args = [%{variant_id: 27, count: 2}, %{variant_id: 28, count: 4}]
  def cart_summary(_parent, args, _resolution) do
    ids = args[:input] |> Enum.map(&(&1[:variant_id]))

    query = from v in Nectar.Variant,
              join: p in Nectar.Product,
              where: v.product_id == p.id,
            where: v.id in ^ids,
            select: %{variant_id: v.id, price: v.cost_price, name: p.name}
    items = query 
            |> Nectar.Repo.all
            |> Enum.map(&(Map.put(&1, :count, get_count(args, &1[:variant_id]) )))
    
    total = Enum.reduce(items, 0.0, fn item, acc ->
      acc + Decimal.to_float(item[:price]) * item[:count]
    end)
    
    {:ok, %{items: items, total: total}}
  end

  defp get_count(args, variant_id) do
    args[:input]
      |> Enum.find(nil, &(&1[:variant_id] == variant_id))
      |> Map.fetch!(:count)
  end

end
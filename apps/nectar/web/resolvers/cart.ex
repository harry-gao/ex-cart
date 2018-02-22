defmodule Nectar.Resolvers.Cart do
  import Ecto.Query, only: [from: 2]

  def cart_item_count(_, _, %{context: %{current_user: current_user}}) do
    user_id = current_user.id
    query = from i in Nectar.LineItem,
      where: (i.user_id == ^user_id and is_nil(i.order_id)),
      select: count(i.id)
    {:ok, Nectar.Repo.one!(query)}
  end
  
  #args = [%{variant_id: 27, count: 2}, %{variant_id: 28, count: 4}]
  def cart_items(_parent, args, _resolution) do
    ids = args[:input] |> Enum.map(&(&1[:variant_id]))
    query = from v in Nectar.Variant,
              join: p in Nectar.Product,
              where: v.product_id == p.id,
            where: v.id in ^ids,
            select: %{variant_id: v.id, price: v.cost_price, name: p.name, product_id: p.id}
    items = query 
            |> Nectar.Repo.all
            |> Enum.map(&(Map.put(&1, :count, get_count(args, &1[:variant_id]) )))
            |> Enum.map(&(Map.put(&1, :image, get_image(&1[:product_id]) )))
    
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

  defp get_image(product_id) do
    query = from pi in Nectar.ProductImage,
            where: pi.product_id == ^product_id
    image = Nectar.Repo.one!(query)
    Nectar.Uploader.ProductImage.url({image.image, image}, :thumb)
  end

end
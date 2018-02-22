defmodule Nectar.Resolvers.Cart do
  import Ecto.Query, only: [from: 2]

  def cart_item_count(_, _, %{context: %{current_user: current_user}}) do
    user_id = current_user.id
    query = from i in Nectar.LineItem,
      where: (i.user_id == ^user_id and i.order_id == -1),
      select: count(i.id)
    {:ok, Nectar.Repo.one!(query)}
  end
  
  #args = [%{variant_id: 27, count: 2}, %{variant_id: 28, count: 4}]
  def cart_items(_parent, args, %{context: %{current_user: current_user}}) do
    user_id = current_user.id
    query = 
            from l in Nectar.LineItem,
              join: v in Nectar.Variant,
              where: l.variant_id == v.id,
              join: p in Nectar.Product,
              where: v.product_id == p.id,
            where: (l.user_id == ^user_id and l.order_id == -1),
            select: %{id: v.id, price: l.unit_price, name: p.name, product_id: p.id, quantity: l.quantity}
    items = query 
            |> Nectar.Repo.all
            |> Enum.map(&(Map.put(&1, :image, get_image(&1[:product_id]) )))
    
    {:ok, items}
  end

  defp get_image(product_id) do
    query = from pi in Nectar.ProductImage,
            where: pi.product_id == ^product_id
    image = Nectar.Repo.one!(query)
    Nectar.Uploader.ProductImage.url({image.image, image}, :thumb)
  end

end
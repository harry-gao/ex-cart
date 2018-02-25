defmodule Nectar.Resolvers.Cart do
  import Ecto.Query, only: [from: 2]
  alias Nectar.{LineItem, Repo}

  def cart_item_count(_, _, %{context: %{current_user: current_user}}) do
    user_id = current_user.id
    query = from i in Nectar.LineItem,
      where: (i.user_id == ^user_id and i.order_id == -1),
      select: sum(i.quantity)
    {:ok, Nectar.Repo.one!(query)}
  end
  
  def cart_items(_, _, %{context: %{current_user: current_user}}) do
    get_user_cart(current_user.id)
  end

  def add_to_cart(_parent, %{variant_id: variant_id}, %{context: %{current_user: current_user}}) do
    user_id = current_user.id

    case Nectar.Query.LineItem.in_cart(Repo, variant_id, user_id) do
      nil ->
        data = %{user_id: user_id, variant_id: variant_id, quantity: 1, order_id: -1}
        LineItem.create_changeset(%LineItem{}, data)
        |> Repo.insert
      %LineItem{id: id, quantity: quantity} = item ->
        LineItem.quantity_changeset(item, %{add_quantity: 1})
        |> Repo.update 
        
      get_user_cart(user_id)
    end
  end

  def update_cart(_, %{items: items}, %{context: %{current_user: current_user}}) do
    Enum.each(items, &update_or_delete_item/1)
    get_user_cart(current_user.id)
  end

  defp update_or_delete_item(%{id: id, quantity: 0}) do
    Repo.get(Nectar.LineItem, id)
    |> Repo.delete
  end

  defp update_or_delete_item(lineItem) do
    Repo.get(Nectar.LineItem, lineItem.id)
    |> LineItem.direct_quantity_update_changeset(lineItem)
    |> Repo.update
  end

  defp get_user_cart(user_id) do
    query = 
            from l in Nectar.LineItem,
              join: v in Nectar.Variant,
              where: l.variant_id == v.id,
              join: p in Nectar.Product,
              where: v.product_id == p.id,
            where: (l.user_id == ^user_id and l.order_id == -1),
            select: %{id: l.id, variant_id: v.id, price: v.cost_price, name: p.name, product_id: p.id, quantity: l.quantity}
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
defmodule Nectar.Resolvers.Order do
  import Ecto.Query, only: [from: 2]
  alias Nectar.{LineItem, Repo, Order}

  def submit_order(_, %{item_ids: item_ids}, %{context: %{current_user: current_user}}) do
    {:ok, order} = Order.create_changeset(%Order{}, %{user_id: current_user.id})
      |> Repo.insert

    from(i in LineItem, where: i.id in ^item_ids)
      |> Repo.update_all(set: [order_id: order.id])
    
    {:ok, order}
  end

  def get_order(_, %{id: id}, %{context: %{current_user: current_user}}) do
    case Repo.get_by(Order, %{id: id, user_id: current_user.id}) do
      nil -> {:ok, "Not found"}
      order -> {:ok, order}
    end
  end

  def line_items(parent, _, %{context: %{current_user: current_user}}) do
    query = 
      from l in Nectar.LineItem,
        join: v in Nectar.Variant,
        where: l.variant_id == v.id,
        join: p in Nectar.Product,
        where: v.product_id == p.id,
      where: l.order_id == ^parent.id,
      select: %{id: l.id, variant_id: v.id, price: v.cost_price, name: p.name, product_id: p.id, quantity: l.quantity}
    items = query 
            |> Nectar.Repo.all
            |> Enum.map(&(Map.put(&1, :image,  Nectar.Resolvers.Cart.get_image(&1[:product_id]) )))
    
    {:ok, items}
  end

end
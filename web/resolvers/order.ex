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

end
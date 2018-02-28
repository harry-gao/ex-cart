defmodule Nectar.Query.LineItem do
  use Nectar.Query, model: Nectar.LineItem

  def in_order_query(%Nectar.Order{id: order_id}, query \\ Nectar.LineItem) do
    from c in query, where: c.order_id == ^order_id
  end

  def in_order(repo, order, query \\ Nectar.LineItem), do: repo.all(in_order_query(order, query))

  def with_variant_query(%Nectar.Variant{id: variant_id}, query \\ Nectar.LineItem) do
    from c in query, where: c.variant_id == ^variant_id
  end

  def with_variant(repo, variant, query \\ Nectar.LineItem), do: repo.all(with_variant_query(variant, query))

  def in_order_with_variant(order, variant),
    do: with_variant_query(variant, in_order_query(order))

  def in_order_with_variant(repo, order, variant),
    do: repo.one(in_order_with_variant(order, variant))

  def in_cart(repo, variant_id, user_id) do
    query = from l in Nectar.LineItem,
      where: l.user_id == ^user_id and l.variant_id == ^variant_id and l.order_id == -1
    
    query  |> repo.one
  end
end

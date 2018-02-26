defmodule Nectar.Query.ProductImage do
  import Ecto.Query

  def data() do
    Dataloader.Ecto.new(Nectar.Repo, query: &query/2)
  end

  def query(Nectar.ProductImage, params) do
    product_id = params["id"]
    from pi in ProductImage, where: pi.product_id == ^product_id, select: pi
  end

  def query(queryable, _params) do
    queryable
  end
end
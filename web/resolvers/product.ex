defmodule Nectar.Resolvers.Product do
  import Ecto.Query, only: [from: 2]

  alias Nectar.{Repo, Product}

  def list_products(_parent, _args, _resolution) do
    query = from p in Product, preload: [:images]
    {:ok, Repo.all(query)}
  end

  def find_product(_, %{id: id}, _) do
    case Repo.get(Product, id) do
      nil -> {:error, "Not found"}
      p -> {:ok, p}
    end
  end

end
defmodule Nectar.Resolvers.Product do
  import Ecto.Query, only: [from: 2]

  def list_products(_parent, _args, _resolution) do
    query = from p in Nectar.Product, preload: [:images]
    {:ok, Nectar.Repo.all(Nectar.Product)}
  end

end
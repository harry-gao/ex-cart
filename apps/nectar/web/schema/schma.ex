defmodule Nectar.Schema do
  use Absinthe.Schema
  import_types Nectar.Schema.ProductTypes

  alias Nectar.Resolvers

  def context(ctx) do
    source = Dataloader.Ecto.new(Nectar.Repo)

    loader =
      Dataloader.new
      |> Dataloader.add_source(ProductImage, Nectar.Query.ProductImage.data())
  
    Map.put(ctx, :loader, loader)
  end

  def plugins do
    [Absinthe.Middleware.Dataloader] ++ Absinthe.Plugin.defaults()
  end

  query do
    @desc "Get all products"
    field :products, list_of(:product) do
      resolve &Resolvers.Product.list_products/3
    end

  end

end
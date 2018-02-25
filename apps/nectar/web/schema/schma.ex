defmodule Nectar.Schema do
  use Absinthe.Schema
  import_types Nectar.Schema.ProductTypes
  import_types Nectar.Schema.CartTypes
  import_types Nectar.Schema.LineItemTypes

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

    field :cart, :cart do
      resolve fn _,_,_ -> {:ok, %{}} end
    end
  end

  mutation do
    @desc "add to cart"
    field :add_to_cart, type: :line_item do
      arg :variant_id, non_null(:integer)
 
      resolve &Resolvers.Cart.add_to_cart/3
    end

    @desc "update cart"
    field :update_cart, type: :cart do
      arg :items, list_of(:line_item_input)
 
      resolve &Resolvers.Cart.update_cart/3
    end
  end

end
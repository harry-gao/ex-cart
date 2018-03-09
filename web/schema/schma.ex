defmodule Nectar.Schema do
  use Absinthe.Schema
  import_types Nectar.Schema.ProductTypes
  import_types Nectar.Schema.CartTypes
  import_types Nectar.Schema.LineItemTypes
  import_types Nectar.Schema.OrderTypes
  import_types Nectar.Schema.AddressTypes

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

  def handle_errors(fun) do
    fn source, args, info ->
      case Absinthe.Resolution.call(fun, source, args, info) do
        {:error, %Ecto.Changeset{} = changeset} -> format_changeset(changeset)
        val -> val
      end
    end
  end

  def format_changeset(changeset) do
    errors = changeset.errors
      |> Enum.map(fn({key, {value, context}}) -> 
           [message: "#{key} #{value}"]
         end)
    {:error, errors}
  end

  query do
    @desc "Get all products"
    field :products, list_of(:product) do
      resolve &Resolvers.Product.list_products/3
    end

    field :cart, :cart do
      resolve fn _,_,_ -> {:ok, %{}} end
    end

    field :order, :order do
      arg :id, non_null(:integer)
      resolve &Resolvers.Order.get_order/3
    end

    field :addresses, list_of(:address) do
      resolve &Resolvers.Address.get_addresses/3
    end
  end

  mutation do
    @desc "add to cart"
    field :add_to_cart, type: :cart do
      arg :variant_id, non_null(:integer)
 
      resolve &Resolvers.Cart.add_to_cart/3
    end

    @desc "update cart"
    field :update_cart, type: :cart do
      arg :items, list_of(:line_item_input)
 
      resolve &Resolvers.Cart.update_cart/3
    end

    @desc "submit order"
    field :submit_order, type: :order do
      arg :item_ids, list_of(:integer)
 
      resolve &Resolvers.Order.submit_order/3
    end

    @desc "create address"
    field :create_address, type: :address do
      arg :address_line_1, non_null(:string)
      arg :name, non_null(:string)
      arg :phone, non_null(:string)
 
      resolve handle_errors(&Resolvers.Address.create/3)
    end

    @desc "create order_shipping_address"
    field :create_order_shipping_address, type: :order_shipping_address do
      arg :order_id, non_null(:integer)
      arg :address_id, non_null(:integer)
 
      resolve handle_errors(&Resolvers.Address.create_order_address/3)
    end

  end

end
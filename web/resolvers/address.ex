defmodule Nectar.Resolvers.Address do
  import Ecto.Query, only: [from: 2]
  alias Nectar.{Repo, Address, OrderShippingAddress}

  def get_addresses(_, args, %{context: %{current_user: current_user}}) do
    user_id = current_user.id
    query = from a in Address, where: (a.user_id == ^user_id)
    {:ok, Repo.all(query)}
  end

  def create(_, args, %{context: %{current_user: current_user}}) do
    Address.create_changeset(%Address{}, Map.merge(args, %{user_id: current_user.id}))
      |> Repo.insert
  end

  def create_order_address(_, %{order_id: order_id, address_id: address_id} = args, _) do
    (from oa in OrderShippingAddress, where: oa.order_id == ^order_id)
      |> Repo.delete_all
    
    OrderShippingAddress.create_changeset(%OrderShippingAddress{}, args)
      |> Repo.insert
    #TODO error handling
    
    {:ok, %{order_id: order_id, address: Repo.get(Address, address_id)}}
  end

end
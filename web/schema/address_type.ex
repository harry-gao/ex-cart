defmodule Nectar.Schema.AddressTypes do
  use Absinthe.Schema.Notation

  use Absinthe.Ecto, repo: Nectar.Repo
  import Ecto.Query

  object :address do
    field :id, :integer
    field :name, :string
    field :phone, :string
    field :address_line_1, :string
    field :user_id, :integer
  end

  object :order_shipping_address do
    field :id, :integer
    field :order_id, :integer
    field :address_id, :integer
  end
end
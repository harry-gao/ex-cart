defmodule Nectar.Address do
  use Nectar.Web, :model

  schema "addresses" do
    field :phone, :string
    field :name, :string
    field :address_line_1, :string
    field :address_line_2, :string

    belongs_to :state, Nectar.State
    belongs_to :country, Nectar.Country

    belongs_to :user, Nectar.User

    #has_one :user_address, Nectar.UserAddress
    #has_one :user, through: [:user_address, :user]

    has_many :order_billing_addresses, Nectar.OrderBillingAddress
    has_many :billing_orders, through: [:order_billing_addresses, :order]

    has_many :order_shipping_addresses, Nectar.OrderShippingAddress
    has_many :shipping_order, through: [:order_shipping_addresses, :order]

    timestamps()
    extensions()
  end

  @required_fields ~w(address_line_1 phone name user_id)a
  @optional_fields ~w()a
  def create_changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_length(:address_line_1, min: 5)
    |> foreign_key_constraint(:user_id)
  end

  # def registered_user_changeset(model, params \\ :empty) do
  #   changeset(model, params)
  #   |> cast_assoc(:user_address, required: true)
  # end

end

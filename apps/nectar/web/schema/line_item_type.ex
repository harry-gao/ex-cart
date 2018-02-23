defmodule Nectar.Schema.LineItemTypes do
  use Absinthe.Schema.Notation

  use Absinthe.Ecto, repo: Nectar.Repo
  import Ecto.Query
  alias Nectar.Resolvers

  object :line_item do
    field :id, :integer
    field :variant_id, :integer
    field :order_id, :integer
  end
end
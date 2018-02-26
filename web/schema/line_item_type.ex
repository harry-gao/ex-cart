defmodule Nectar.Schema.LineItemTypes do
  use Absinthe.Schema.Notation

  use Absinthe.Ecto, repo: Nectar.Repo
  import Ecto.Query
  alias Nectar.Resolvers

  input_object :line_item_input do
    field :id, non_null(:integer)
    field :quantity, non_null(:integer)
  end
end
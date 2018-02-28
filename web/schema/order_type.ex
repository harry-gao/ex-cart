defmodule Nectar.Schema.OrderTypes do
  use Absinthe.Schema.Notation

  use Absinthe.Ecto, repo: Nectar.Repo
  import Ecto.Query

  object :order do
    field :id, :integer
  end
end
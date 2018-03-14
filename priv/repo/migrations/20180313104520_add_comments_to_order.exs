defmodule Nectar.Repo.Migrations.AddCommentsToOrder do
  use Ecto.Migration

  def change do
    alter table("orders") do
      add :comment, :string
    end
  end
end

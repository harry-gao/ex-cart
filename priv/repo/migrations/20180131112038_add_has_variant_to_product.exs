defmodule Nectar.Repo.Migrations.AddHasVariantToProduct do
  use Ecto.Migration

  def change do
    alter table(:products) do
      add :has_variant, :boolean
    end
  end
end

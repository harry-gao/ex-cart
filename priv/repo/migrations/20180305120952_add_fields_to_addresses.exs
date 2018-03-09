defmodule Nectar.Repo.Migrations.AddFieldsToAddresses do
  use Ecto.Migration

  def change do
    alter table("addresses") do
      add :user_id, references(:users)
      add :name, :string, null: false
      add :phone, :string, null: false
    end
  end
end

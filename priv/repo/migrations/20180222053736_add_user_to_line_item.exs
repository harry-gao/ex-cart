defmodule Nectar.Repo.Migrations.AddUserToLineItem do
  use Ecto.Migration

  def change do
    alter table(:line_items) do
      add :user_id, references(:users)
    end
  end
end

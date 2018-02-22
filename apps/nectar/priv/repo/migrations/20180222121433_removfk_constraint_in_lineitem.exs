defmodule Nectar.Repo.Migrations.RemovfkConstraintInLineitem do
  use Ecto.Migration

  def up do
    execute "ALTER TABLE line_items DROP CONSTRAINT line_items_order_id_fkey"
  end
end

defmodule Nectar.Repo.Migrations.CreateProductImage do
  use Ecto.Migration

  def change do
    create table(:product_images) do
      add :image, :string
      add :product_id, references(:products, on_delete: :delete_all)

      timestamps()
    end

    create index(:product_images, [:product_id])
  end
end

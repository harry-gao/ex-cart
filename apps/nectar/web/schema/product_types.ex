defmodule Nectar.Schema.ProductTypes do
  use Absinthe.Schema.Notation

  use Absinthe.Ecto, repo: Nectar.Repo
  import Ecto.Query

  object :product do
    field :id, :id
    field :name, :string
    field :description, :string
    field :images, list_of(:product_image), resolve: assoc(:images)
    # do
    #   resolve assoc(:images, fn query, args, _ctx ->
    #     query
    #   end)
      # middleware Absinthe.Middleware.Dataloader
      # resolve fn product, _, resolution ->
      #   require IEx; IEx.pry
      #   resolution |> Map.get(:context) |> Map.get(:loader) |> Dataloader.load(ProductImage, Nectar.ProductImage, product.id) 
      #   |> Dataloader.run() |> Dataloader.get(ProductImage,  Nectar.ProductImage, product.id)
      # end
    #end
  end

  object :product_image do
    field :product_id, :id
    field :url, :string do
      resolve fn image, _, _ ->
        {:ok, Nectar.Uploader.ProductImage.url({image.image, image}, :mobile)}
      end
    end
  end
end
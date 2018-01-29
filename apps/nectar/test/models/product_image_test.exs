defmodule Nectar.ProductImageTest do
  use Nectar.ModelCase

  alias Nectar.ProductImage

  @valid_attrs %{image: "some image"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = ProductImage.changeset(%ProductImage{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = ProductImage.changeset(%ProductImage{}, @invalid_attrs)
    refute changeset.valid?
  end
end

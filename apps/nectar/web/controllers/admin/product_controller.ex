defmodule Nectar.Admin.ProductController do
  use Nectar.Web, :admin_controller

  alias Nectar.Product
  alias Nectar.OptionType
  alias Nectar.SearchProduct

  plug :scrub_params, "product" when action in [:create, :update]
  plug :load_categories_and_option_types when action in [:create, :new, :edit, :update]

  def index(conn, %{"search_product" => search_params} = _params) do
    products = Repo.all(SearchProduct.search(search_params))
    render(conn, "index.html", products: products,
      search_changeset: SearchProduct.changeset(%SearchProduct{}, search_params),
      search_action: admin_product_path(conn, :index)
    )
  end
  def index(conn, _params) do
    products = Nectar.Query.Product.all(Repo)
    render(conn, "index.html", products: products,
      search_changeset: SearchProduct.changeset(%SearchProduct{}),
      search_action: admin_product_path(conn, :index)
    )
  end

  def new(conn, %{"type" => "single"} = params) do
    changeset = Product.changeset(%Product{available_on: Ecto.Date.utc, has_variant: true})
    render(conn, "new_single.html", changeset: changeset)
  end

  def new(conn, %{"type" => "multi"} = params) do
    changeset = Product.changeset(%Product{available_on: Ecto.Date.utc,  has_variant: true})
    render(conn, "new_multi.html", changeset: changeset)
  end

  def new(conn, params) do
    render(conn, "new.html")
  end

  def create(conn, %{"product" => product_params}) do
    case Nectar.Command.Product.insert(Repo, product_params) do
      {:ok, _product} ->
        conn
        |> put_flash(:info, "Product created successfully.")
        |> redirect(to: admin_product_path(conn, :index))
      {:error, changeset} ->
        case product_params[:has_variant] do
          true -> render(conn, "new_multi.html", changeset: changeset)
          _ -> render(conn, "new_single.html", changeset: changeset)
        end
    end
  end

  def show(conn, %{"id" => id}) do
    product =
      Nectar.Query.Product.get!(Repo, id)
      |> Repo.preload([:master, :option_types, :categories, :images])
    render(conn, "show.html", product: product)
  end

  def edit(conn, %{"id" => id}) do
    product = Nectar.Query.Product.get!(Repo, id) |> Repo.preload([:master, :product_option_types, :product_categories, :images])
    changeset = Product.changeset(product)
    render(conn, "edit.html", product: product, changeset: changeset)
  end

  def update(conn, %{"id" => id, "product" => product_params}) do
    product = Nectar.Query.Product.get!(Repo, id) |> Repo.preload([:master, :product_option_types, :product_categories, :images])
    case Nectar.Command.Product.update(Repo, product, product_params) do
      {:ok, product} ->
        conn
        |> put_flash(:info, "Product updated successfully.")
        |> redirect(to: admin_product_path(conn, :show, product))
      {:error, changeset} ->
        render(conn, "edit.html", product: product, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    product = Nectar.Query.Product.get!(Repo, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Nectar.Command.Product.delete!(Repo, product)

    conn
    |> put_flash(:info, "Product deleted successfully.")
    |> redirect(to: admin_product_path(conn, :index))
  end

  defp load_categories_and_option_types(conn, _params) do
    get_option_types = Repo.all(from strct in OptionType, select: {strct.name, strct.id})
    categories = Nectar.Query.Category.leaf_categories_name_and_id(Nectar.Repo)
    conn
    |> assign(:get_option_types, get_option_types)
    |> assign(:categories, categories)
  end

end

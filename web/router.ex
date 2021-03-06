defmodule Nectar.Router do
  use Nectar.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :browser_auth do
    plug Guardian.Plug.Pipeline, module: Nectar.Guardian, error_handler: Nectar.Auth.HandleUnauthenticated
    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.LoadResource
  end

  pipeline :api_auth do
    plug Guardian.Plug.Pipeline,  module: Nectar.Guardian, error_handler: Nectar.Auth.HandleUnauthenticatedApi
    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.LoadResource
  end

  pipeline :admin_browser_auth do
    plug Guardian.Plug.Pipeline,  module: Nectar.Guardian, error_handler: Nectar.Auth.HandleUnauthenticated
    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.LoadResource
    plug Nectar.Plugs.AdminAccessRequired
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
  end

  pipeline :graphql do
    plug Guardian.Plug.Pipeline,  module: Nectar.Guardian, error_handler: Nectar.Auth.HandleUnauthenticatedApi
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
    plug Nectar.Plugs.GraphqlContext
  end

  scope "/", Nectar do
    pipe_through [:browser]
    resources "/sessions", SessionController, only: [:new, :create]
    get "/guest_token", SessionController, :guest_token
  end

  scope "/", Nectar do

    pipe_through [:browser, :browser_auth] # Use the default browser stack

    resources "/registrations", RegistrationController, only: [:new, :create]
    #resources "/sessions", SessionController, only: [:new, :create]
    delete "/logout", SessionController, :logout

    resources "/orders", OrderController, only: [:index, :show]

  end

  # all actions where the user's cart is required go here.
  # note: if cart is not present it will create and link a new one.
  scope "/", Nectar do
    pipe_through [:browser, :browser_auth, Nectar.Plugs.Cart]
    get "/", ProductController, :index, as: :home

    get "/cart", CartController, :show
    put "/cart", CartController, :update

    resources "/products", ProductController, only: [:show, :index]
    resources "/line_items", LineItemController, only: [:create, :delete]
    get "/checkout",      CheckoutController, :checkout
    put "/checkout/next", CheckoutController, :next
    put "/checkout/back", CheckoutController, :back
    resources "/categories", CategoryController do
      get "/products", CategoryController, :associated_products, as: :products
    end
  end

  scope "/admin", Nectar.Admin, as: :admin do
    pipe_through [:browser, :admin_browser_auth]

    get "/", HomeController, :index
    resources "/countries", CountryController do
      resources "/states", StateController, only: [:create, :delete]
    end
    resources "/zones", ZoneController do
      resources "/members", ZoneMemberController, only: [:create, :delete]
    end

    resources "/cart", CartController, only: [:new, :edit, :create]

    resources "/categories", CategoryController

    resources "/orders", OrderController, only: [:index, :show, :update, :edit] do
      resources "/line_items", LineItemController, only: [:create, :delete] do
        put "/update_fullfillment", LineItemController, :update_fullfillment
      end
      get "/checkout", CheckoutController, :checkout
      put "/checkout/next", CheckoutController, :next
      put "/checkout/back", CheckoutController, :back
      resources "/payments", PaymentController, only: [:show] do
        put "/refund",  PaymentController, :refund,  as: :refund
        put "/capture", PaymentController, :capture, as: :capture
      end
    end

    resources "/users", UserController do
      get "/all_pending_orders", UserController, :all_pending_orders
    end

    resources "/settings", SettingController, only: [:edit, :update]
    get "/settings/payment", SettingController,  :payment_method_settings
    get "/settings/shipping", SettingController, :shipping_method_settings
    post "/settings/payment", SettingController,  :update_payment_method_settings
    post "/settings/shipping", SettingController, :update_shipping_method_settings

    get "/echo", ChannelEchoController, :echo
    post "/echo", ChannelEchoController, :do_echo


    resources "/option_types", OptionTypeController

    resources "/products", ProductController do
      resources "/variants", VariantController
    end
    resources "/users", UserController
  end

  scope "/api", Nectar.Api do
    pipe_through [:api, :api_auth, Nectar.Plugs.Cart]
    get "/cart", CartController, :show
  end

  scope "/admin_api", Nectar.Admin do
    pipe_through [:api]
    post "/contentimage", ContentImageController, :upload
  end

  scope "/q" do
    pipe_through [:graphql]
    forward "/graphql",
      Absinthe.Plug,
      [schema: Nectar.Schema]
  end
  

  forward "/graphiql",
    Absinthe.Plug.GraphiQL,
    [
      schema: Nectar.Schema,
      interface: :simple,
      default_url: "http://localhost:4000/q/graphql",
      default_headers: {__MODULE__, :graphiql_headers}
    ]

  use Nectar.RouteExtender
  # Other scopes may use custom stacks.
  # scope "/api", Nectar do
  #   pipe_through :api
  # end

  def graphiql_headers(conn) do
    %{
      "authorization" => "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJOZWN0YXIuZGV2IiwiZXhwIjoxNTIxODY4MjYyLCJpYXQiOjE1MTkyNzYyNjIsImlzcyI6Ik5lY3Rhci5kZXYiLCJqdGkiOiI4MGUzNzkwNC1kNGY3LTQ2YWItYmRhOC1mYmU5ZjRmNTcyMGMiLCJuYmYiOjE1MTkyNzYyNjEsInN1YiI6IjEwIiwidHlwIjoiYWNjZXNzIn0.AZZpj4veNbOvLe2HjGJb71AcP3EBrUjxWvrJzRBok_xegAinzNmDKfZK0EqTPpLsCgsdpAMyZa0vUCMYL_yJ8Q"
    }
  end
  
end

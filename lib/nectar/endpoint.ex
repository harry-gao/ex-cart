defmodule Nectar.Endpoint do
  use Phoenix.Endpoint, otp_app: :nectar

  socket "/socket", Nectar.UserSocket

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phoenix.digest
  # when deploying your static files in production.
  
  plug Plug.Static.IndexHtml,
    at: "/"
  
  plug Plug.Static,
    at: "/", from: {:nectar, "priv/cart-client/build"},
    only: ~w(index.html favicon.ico static service-worker.js assets)
  
  
  plug Plug.Static,
    at: "/admin_assets", from: :nectar, gzip: false,
    only: ~w(uploads css fonts images js tinymce favicon.ico robots.txt)
  
  plug CORSPlug, origin: ["http://localhost:3000", "http://localhost:4000"]

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    socket "/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket
    plug Phoenix.LiveReloader
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId
  plug Plug.Logger

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json, Absinthe.Plug.Parser],
    pass: ["*/*"],
    json_decoder: Poison

  plug Plug.MethodOverride
  plug Plug.Head

  plug Plug.Session,
    store: :cookie,
    key: "_nectar_key",
    signing_salt: "8dI5dqCI"

  plug Nectar.Router
end

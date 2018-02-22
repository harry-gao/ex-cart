defmodule Nectar.Auth.HandleUnauthenticated do

  import Nectar.Router.Helpers, only: [session_path: 2]

  use Phoenix.Controller

  def auth_error(conn, {type, reason}, _opts) do
    require IEx; IEx.pry
    conn
    |> put_flash(:error, "Please login to continue")
    |> redirect(to: session_path(conn, :new))
  end
end

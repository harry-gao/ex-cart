defmodule Nectar.Plugs.GraphqlContext do
  import Plug.Conn
  
  def init(_opts) do
  end

  def call(conn, _) do
    put_private(conn, :absinthe, %{context: %{current_user: conn.private[:guardian_default_resource]}})
  end

end
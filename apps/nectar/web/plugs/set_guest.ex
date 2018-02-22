defmodule Nectar.Plugs.SetGuest do
  import Plug.Conn

  def init(_opts) do
  end

  def call(conn, opts) do
    case fetch_token_from_header(conn, opts) do
      {:ok, "guest"} -> 
        attrs = %{email: "guest_#{random_string(8)@t.com}", password: "password"}
        Nectar.Command.User.register_user(Nectar.Repo, attrs)
        conn |> assign(:current_order, order)
      _ ->
        conn
    end
  end

  @spec fetch_token_from_header(Plug.Conn.t(), Keyword.t()) ::
          :no_token_found
          | {:ok, String.t()}
  defp fetch_token_from_header(conn, opts) do
    headers = get_req_header(conn, "authorization")
    fetch_token_from_header(conn, opts, headers)
  end

  @spec fetch_token_from_header(Plug.Conn.t(), Keyword.t(), Keyword.t()) ::
          :no_token_found
          | {:ok, String.t()}
  defp fetch_token_from_header(_, _, []), do: :no_token_found

  defp fetch_token_from_header(conn, opts, [token | tail]) do
    reg = Keyword.get(opts, :realm_reg, ~r/^(.*)$/)
    trimmed_token = String.trim(token)
    case Regex.run(reg, trimmed_token) do
      [_, match] -> {:ok, String.trim(match)}
      _ -> fetch_token_from_header(conn, opts, tail)
    end
  end

  def random_string(length) do
    :crypto.strong_rand_bytes(length) |> Base.url_encode64 |> binary_part(0, length)
  end
end
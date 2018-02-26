defmodule Nectar.Admin.ContentImageController do
  use Nectar.Web, :admin_controller

  def upload(conn, params) do
    #require IEx; IEx.pry
    file = params["file"]
    product_id = params["id"]
    case Nectar.ContentImage.store({file, product_id}) do
      {:ok, filename} ->
        url = Nectar.ContentImage.url({filename, product_id}, :mobile)
        pretty_json(conn, %{location: url})
      {:error, reason} ->
        pretty_json(conn, %{error: reason})
      _ -> 
        pretty_json(conn, %{error: "unhandled serverside error"})
    end
  end

  def pretty_json(conn, data) do
    conn
    |> Plug.Conn.put_resp_header("content-type", "application/json; charset=utf-8")
    |> Plug.Conn.send_resp(200, Poison.encode!(data, pretty: true))
  end

end

defmodule Nectar.Helper do
  alias Ecto.Date
  
  def days_later(days) do
    current = Date.utc 
            |> Date.to_erl
            |> :calendar.date_to_gregorian_days
            |> Kernel.+(days)
            |> :calendar.gregorian_days_to_date
            |> Date.from_erl
  end
end
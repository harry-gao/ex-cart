defmodule Nectar.Admin.SettingView do
  use Nectar.Web, :view

  def setting_name(%Phoenix.HTML.Form{data: %Nectar.SettingPair{name: name}}) do
    Phoenix.Naming.humanize(name)
  end
end

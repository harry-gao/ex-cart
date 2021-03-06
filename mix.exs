defmodule Nectar.Mixfile do
  use Mix.Project

  def project do
    [app: :nectar,
     version: "0.0.1",
     elixir: "~> 1.5.3",
     elixirc_paths: elixirc_paths(Mix.env),
     compilers: [:phoenix, :gettext] ++ Mix.compilers,
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     aliases: aliases(),
     build_path: "./_build",
     config_path: "./config/config.exs",
     deps_path: "./deps",
     lockfile: "./mix.lock",
     deps: deps()]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {Nectar, []},
      applications: [
        :phoenix, :phoenix_html, :cowboy, :logger, :gettext,
        :phoenix_ecto, :postgrex, :worldly, :yamerl,
        :ex_aws, :httpoison, :phoenix_pubsub, :hackney
      ]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(_),     do: ["lib", "web"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, "~> 1.3.0"},
      {:phoenix_pubsub, "~> 1.0"},
      {:postgrex, ">= 0.12.2"},
      {:phoenix_ecto, "~> 3.3.0"},
      {:phoenix_html, "~> 2.4"},
      {:phoenix_live_reload, "~> 1.1", only: :dev},
      {:gettext, "~> 0.14"},
      {:cowboy, "~> 1.0"},
      {:comeonin, "~> 2.1"},
      {:guardian, "~> 1.0"},
      {:ex_aws, "~> 1.1.0"},
      {:arc_ecto, "~> 0.7.0"},
      #{:commerce_billing, github: "nimish-mehta/commerce_billing",  override: true},
      {:braintree, "~> 0.5.0"},
      {:yamerl, github: "yakaz/yamerl"},
      {:worldly, "~> 0.1.2"},
      {:secure_random, "~> 0.5"},
      {:sweet_xml, "~> 0.6"},
      {:absinthe_plug, "~> 1.4.0"},
      {:absinthe_ecto, "~> 0.1.3"},
      {:dataloader, "~> 1.0.0"},
      {:plug_static_index_html, "~> 1.0"},
      {:cors_plug, "~> 1.2"},
    ]
  end

  # Aliases are shortcut or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    ["ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
     "ecto.reset": ["ecto.drop", "ecto.setup"],
    "test": ["ecto.create --quiet", "ecto.migrate", "test"]]
  end
end

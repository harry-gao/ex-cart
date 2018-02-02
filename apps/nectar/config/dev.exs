use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :nectar, Nectar.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [node: ["node_modules/brunch/bin/brunch", "watch", "--stdin"]]

# Watch static and templates for browser reloading.
config :nectar, Nectar.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{priv/gettext/.*(po)$},
      ~r{web/views/.*(ex)$},
      ~r{web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development.
# Do not configure such in production as keeping
# and calculating stacktraces is usually expensive.
config :phoenix, :stacktrace_depth, 20

config :arc,
  bucket: System.get_env("AWS_S3_BUCKET"),
  virtual_host: true

config :ex_aws,
  debug_requests: true,
  access_key_id:  [{:system, "AWS_ACCESS_KEY_ID"}, :instance_role],
  secret_access_key: [{:system, "AWS_SECRET_ACCESS_KEY"}, :instance_role],
  region: "ap-southeast-1",
  s3: [
    scheme: "https://",
    host: "s3.ap-southeast-1.amazonaws.com/",
    region: "ap-southeast-1"
  ]

config :ex_aws, :hackney_opts,
  follow_redirect: true,
  recv_timeout: 30_000
 

import_config "dev.secret.exs"

config :nectar, :shipping_calculators,
  regular: Nectar.ShippingCalculator.Flat,
  express: Nectar.ShippingCalculator.Fast

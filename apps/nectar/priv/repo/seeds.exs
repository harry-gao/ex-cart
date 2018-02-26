# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Nectar.Repo.insert!(%Nectar.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

# Seed.LoadCountry.seed!
# Seed.CreateZone.seed!
Nectar.Repo.insert!(%Nectar.User{name: "Admin", email: "harry@harrygao.com", encrypted_password: Comeonin.Bcrypt.hashpwsalt("test123..."), is_admin: true})
# Seed.LoadSettings.seed!
# Seed.CreateShippingMethod.seed!
# Seed.CreateTax.seed!
# Seed.CreatePaymentMethod.seed!
# Seed.LoadProducts.seed!

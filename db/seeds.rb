#
# Users
#

ActiveRecord::Base.connection.execute("TRUNCATE TABLE users RESTART IDENTITY")

tanjo = User.create(
  name: "Tanjo.ai",
  email: "admin@tanjo.ai",
  password: "Tanjo Rocks!",
  role: "system_admin"
)
tanjo.confirm

User.all.each {|user| ApiKey.create(user: user)}

#
# Structures
#

ActiveRecord::Base.connection.execute("TRUNCATE TABLE structures RESTART IDENTITY")

StrucData.import
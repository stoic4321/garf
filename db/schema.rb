# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_05_10_191029) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "citext"
  enable_extension "plpgsql"

  create_table "api_keys", force: :cascade do |t|
    t.integer "user_id"
    t.uuid "key", null: false
    t.string "secret", null: false
    t.boolean "active", default: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["key", "secret", "active"], name: "index_api_keys_on_key_and_secret_and_active", unique: true
    t.index ["key", "secret"], name: "index_api_keys_on_key_and_secret", unique: true
    t.index ["user_id"], name: "index_api_keys_on_user_id"
  end

  create_table "journeys", force: :cascade do |t|
    t.integer "user_id"
    t.string "name"
    t.jsonb "data", default: "{}"
    t.uuid "token"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["token"], name: "index_journeys_on_token"
    t.index ["user_id"], name: "index_journeys_on_user_id"
  end

  create_table "structures", force: :cascade do |t|
    t.string "name"
    t.integer "flavor"
    t.jsonb "data", default: {}
    t.text "text"
    t.string "picker"
    t.integer "parent_id"
    t.integer "children_count", default: 0, null: false
    t.integer "lft"
    t.integer "rgt"
    t.integer "depth", default: 0
    t.boolean "active", default: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "handle"
    t.string "impacts"
    t.integer "ordering"
    t.index ["flavor"], name: "index_structures_on_flavor"
    t.index ["handle"], name: "index_structures_on_handle"
    t.index ["parent_id"], name: "index_structures_on_parent_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.integer "role", default: 0, null: false
    t.boolean "force_password_change", default: false, null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

end

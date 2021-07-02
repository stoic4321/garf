class CreateApiKeys < ActiveRecord::Migration[6.0]
  def change
    create_table :api_keys do |t|
      t.integer :user_id, null: true
      t.uuid :key, null: false
      t.string :secret, null: false
      t.boolean :active, default: true
      t.timestamps
      t.index ["key", "secret"], name: "index_api_keys_on_key_and_secret", unique: true
      t.index ["key", "secret", "active"], name: "index_api_keys_on_key_and_secret_and_active", unique: true
      t.index ["user_id"], name: "index_api_keys_on_user_id"
    end
  end
end

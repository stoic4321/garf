class CreateBusinesses < ActiveRecord::Migration[6.0]
  def change
    create_table :businesses do |t|
      t.integer :user_id
      t.integer :county_id
      t.integer :industry_id
      t.string :name
      t.text :address
      t.string :website
      t.string :phone_number

      t.timestamps
    end
    add_index :businesses, :user_id
    add_index :businesses, :county_id
    add_index :businesses, :industry_id
    add_index :businesses, [:county_id, :industry_id]
  end
end

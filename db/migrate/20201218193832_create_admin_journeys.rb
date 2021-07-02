class CreateAdminJourneys < ActiveRecord::Migration[6.0]
  def change
    create_table :journeys do |t|
      t.integer :user_id
      t.string :name
      t.jsonb :data, default: '{}'
      t.uuid :token

      t.timestamps
    end
    add_index :journeys, :user_id
    add_index :journeys, :token
  end
end

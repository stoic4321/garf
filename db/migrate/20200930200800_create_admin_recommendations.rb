class CreateAdminRecommendations < ActiveRecord::Migration[6.0]
  def change
    create_table :recommendations do |t|
      t.integer :metric_id
      t.integer :low
      t.integer :high
      t.integer :effect
      t.text :description
      t.boolean :active, default: true

      t.timestamps
    end
    add_index :recommendations, :metric_id
    add_index :recommendations, :active
    add_index :recommendations, [:active, :metric_id]
    add_index :recommendations, [:low, :high]
  end
end

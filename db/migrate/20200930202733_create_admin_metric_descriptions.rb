class CreateAdminMetricDescriptions < ActiveRecord::Migration[6.0]
  def change
    create_table :metric_descriptions do |t|
      t.integer :metric_id
      t.integer :low
      t.integer :high
      t.text :description

      t.timestamps
    end
    add_index :metric_descriptions, :metric_id
    add_index :metric_descriptions, [:low, :high]
  end
end

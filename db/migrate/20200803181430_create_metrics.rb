class CreateMetrics < ActiveRecord::Migration[6.0]
  def change
    create_table :metrics do |t|
      t.string :name
      t.integer :parent_id, null: true, index: true
      t.integer :children_count, null: false, default: 0

      t.timestamps
    end
  end
end

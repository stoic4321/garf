class CreateScores < ActiveRecord::Migration[6.0]
  def change
    create_table :scores do |t|
      t.integer :county_id, index: true
      t.integer :metric_id, index: true
      t.integer :formula, null: :false, default: 0
      t.float :score, null: :false, default: 0.0

      t.timestamps
    end
  end
end

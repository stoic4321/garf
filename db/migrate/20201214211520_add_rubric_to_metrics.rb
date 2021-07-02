class AddRubricToMetrics < ActiveRecord::Migration[6.0]
  def change
    add_column :metrics, :rubric, :string, null: true
    add_index :metrics, :rubric
  end
end

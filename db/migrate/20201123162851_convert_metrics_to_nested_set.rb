class ConvertMetricsToNestedSet < ActiveRecord::Migration[6.0]
  def change
    change_column :metrics, :parent_id, :integer, default: 0
    add_column :metrics, :lft, :integer
    add_column :metrics, :rgt, :integer
    add_column :metrics, :depth, :integer, default: 0
    add_index :metrics, :lft
    add_index :metrics, :rgt
    add_index :metrics, :depth
  end
end

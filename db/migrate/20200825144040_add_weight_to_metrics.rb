class AddWeightToMetrics < ActiveRecord::Migration[6.0]
  def change
    add_column :metrics, :weight, :float, default: 0.0
  end
end

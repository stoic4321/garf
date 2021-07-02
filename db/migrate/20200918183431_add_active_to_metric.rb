class AddActiveToMetric < ActiveRecord::Migration[6.0]
  def change
    add_column :metrics, :active, :boolean, default: false
    add_index :metrics, :active
    Metric.update_all(active: true)
  end
end

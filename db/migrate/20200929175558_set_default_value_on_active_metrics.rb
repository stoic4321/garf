class SetDefaultValueOnActiveMetrics < ActiveRecord::Migration[6.0]
  def change
    change_column :metrics, :active, :boolean, default: true
  end
end

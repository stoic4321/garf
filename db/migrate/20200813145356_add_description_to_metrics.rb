class AddDescriptionToMetrics < ActiveRecord::Migration[6.0]
  def change
    add_column :metrics, :description, :text
  end
end

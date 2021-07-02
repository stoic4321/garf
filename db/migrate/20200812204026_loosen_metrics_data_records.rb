class LoosenMetricsDataRecords < ActiveRecord::Migration[6.0]
  def change
    remove_column :data_records, :metric_id
    #add_index :data_records, :county_id
  end
end

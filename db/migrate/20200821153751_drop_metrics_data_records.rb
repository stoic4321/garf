class DropMetricsDataRecords < ActiveRecord::Migration[6.0]
  def up
    drop_table :metrics_data_records
  end

  def down
    create_table :metrics_data_records, id: false do |t|
      t.belongs_to :metric
      t.belongs_to :data_record
    end
  end
end

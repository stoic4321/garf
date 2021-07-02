class CreateMetricsDataRecords < ActiveRecord::Migration[6.0]
  def change
    create_table :metrics_data_records, id: false do |t|
      t.belongs_to :metric
      t.belongs_to :data_record
    end
  end
end

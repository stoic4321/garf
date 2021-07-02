class CreateDataRecords < ActiveRecord::Migration[6.0]
  def change
    enable_extension 'citext'
    create_table :data_records do |t|
      t.integer :county_id, null: false, index: true
      t.integer :metric_id, null: false, index: true
      t.date :date, null: false, default: ->{ 'current_date' }
      t.datetime :timestamp, null: false, default: ->{ 'NOW()' }
      t.jsonb :data, null: false, default: '{}'

      t.timestamps
    end
  end
end

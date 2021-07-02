class AddStaticDataToCounties < ActiveRecord::Migration[6.0]
  def change
    add_column :counties, :static_data, :jsonb, null: false, default: '{}'
  end
end

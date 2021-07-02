class AddLocationToCounties < ActiveRecord::Migration[6.0]
  def change
    add_column :counties, :lat, :float
    add_column :counties, :long, :float
  end
end

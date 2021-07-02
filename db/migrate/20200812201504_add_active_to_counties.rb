class AddActiveToCounties < ActiveRecord::Migration[6.0]
  def change
    add_column :counties, :active, :boolean, default: false, index: true
  end
end

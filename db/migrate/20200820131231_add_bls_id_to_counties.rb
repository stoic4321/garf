class AddBlsIdToCounties < ActiveRecord::Migration[6.0]
  def change
    add_column :counties, :bls_id, :integer
  end
end

class AddOrderingToStructures < ActiveRecord::Migration[6.0]
  def change
    add_column :structures, :ordering, :integer
  end
end

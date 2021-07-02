class AddHandleToStructures < ActiveRecord::Migration[6.0]
  def change
    add_column :structures, :handle, :string
    add_index  :structures, :handle
  end
end

class CreateAdminStructures < ActiveRecord::Migration[6.0]
  def change
    create_table :structures do |t|
      t.string  :name
      t.integer :flavor
      t.string  :value
      t.jsonb   :data, default: {}
      t.text    :text
      t.string  :interface
      t.integer :parent_id
      t.integer :children_count, default: 0, null: false
      t.integer :lft
      t.integer :rgt
      t.integer :depth, default: 0
      t.boolean :active, default: true
      t.timestamps
    end
    add_index :structures, :flavor
    add_index :structures, :parent_id
  end
end

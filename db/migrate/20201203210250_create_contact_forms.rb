class CreateContactForms < ActiveRecord::Migration[6.0]
  def change
    create_table :contact_forms do |t|
      t.integer :origin, default: 0
      t.integer :status, default: 0
      t.string :email
      t.string :first_name
      t.string :last_name
      t.string :organization
      t.text :message
      t.integer :sender_id
      t.integer :archiver_id
      t.datetime :archived_at
      t.timestamps
    end
    add_index :contact_forms, :status
    add_index :contact_forms, :sender_id
    add_index :contact_forms, :archiver_id
  end
end

class AddSlugToCounties < ActiveRecord::Migration[6.0]
  def change
    add_column :counties, :slug, :string
    add_index  :counties, :slug, unique: true
    County.all.each {|c| c.save}
  end
end

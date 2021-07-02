require "#{Rails.root}/app/helpers/application_helper"
include PropsHelper

class StrucData

  def self.save_structures( json, parent = nil)
    node = Structure.find_or_initialize_by(handle: json["handle"])
    node.update(
      name: json['name'],
      flavor: json['flavor'],
      data: JSON.parse(json['data'].to_json),
      text: json['text'],
      picker: json['picker'],
      parent_id: json['parent_id'],
      active: json['active'],
      impacts: json['impacts'],
      ordering: json['ordering'],
      parent: parent
    )
    if node.persisted? && json["children"].length > 0
      json["children"].each {|child| self.save_structures(child, node)}
    end
    puts "Saved Structure #{node.name}"
  end

  def self.import()
    JSON.load(File.open([Rails.root, "db", "fixtures", "structures.json"].join("/"))).each do |node|
      self.save_structures(node)
    end
  end

  def self.export()
    f_name = [Rails.root, "db", "fixtures", "structures.json"].join("/")
    json_str = JSON.pretty_generate( structures_props() )
    File.write( f_name, json_str, mode: "w+" )
  end  

  def self.destroy_all()
    Structure.destroy_all()
  end

end

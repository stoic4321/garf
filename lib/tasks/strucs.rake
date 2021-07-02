
namespace :strucs do

  task :export => :environment do
    puts "[ StrucData.export() ] --- Begin"
    StrucData.export()
    puts "Done"
  end
  
  
  task :import => :environment do
    puts "[ StrucData.import() ] --- Begin"
    StrucData.import()
    puts "Done"
  end
  
  task :destroy_all => :environment do
    puts "[ StrucData.destroy_all() ] --- Begin"
    StrucData.destroy_all()
    puts "Done"
  end

end


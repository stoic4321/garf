FactoryBot.define do
  factory :structure do
    name { FFaker::HealthcareIpsum.word.titleize }
    active { true }
    text { FFaker::Lorem.sentence }
    flavor { :condition }

    factory :action do
      flavor { :action }
    end
  end
end

FactoryBot.define do
  factory :journey do
    user
    name { FFaker::Company.catch_phrase }
  end
end

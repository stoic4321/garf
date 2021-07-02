FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "test#{n}@example.com" }
    password { 123456789 }
    role { "system_admin" }
    confirmed_at { Time.now }
  end
end
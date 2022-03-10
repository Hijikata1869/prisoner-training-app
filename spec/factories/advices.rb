FactoryBot.define do
  factory :advice do
    sequence(:advice) { |n| "advice#{n}" }
    association :user
    association :question
  end
end
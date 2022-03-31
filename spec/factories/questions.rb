FactoryBot.define do
  factory :question do
    sequence(:question) { |n| "question#{n}" }
    training_menu { 'プッシュアップ' }
    step { 'ステップ１' }
    association :user
  end
end

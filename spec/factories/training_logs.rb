FactoryBot.define do
  factory :training_log do
    training_menu { "プッシュアップ" }
    step { "ステップ１" }
    repetition { "１回" }
    set { "１セット" }
    association :user
  end
end
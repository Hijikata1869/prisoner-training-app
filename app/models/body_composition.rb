class BodyComposition < ApplicationRecord
  belongs_to :user

  validates :weight, presence: true, numericality: { greater_than_or_equal_to: 20, less_than_or_equal_to: 100 }
  validates :body_fat, presence: true, numericality: { greater_than_or_equal_to: 1, less_than_or_equal_to: 50}
end
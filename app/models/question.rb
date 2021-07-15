class Question < ApplicationRecord
  belongs_to :users

  has_many :advices

  validates :question, presence: true
end

class Bookmark < ApplicationRecord
  belongs_to :user
  belongs_to :advice

  validates :advice_id, uniqueness: { scope: :user_id }
end

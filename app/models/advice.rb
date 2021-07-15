class Advice < ApplicationRecord
  belongs_to :user
  belongs_to :question

  has_many :bookmarks

  validates :advice, presence: true

  def bookmarked_by?(user)
    bookmarks.where(user_id: user.id).exists?
  end
end

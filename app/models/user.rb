# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  mount_uploader :image, ImageUploader

  has_many :training_logs, dependent: :destroy
  has_many :questions, dependent: :destroy
  has_many :advices, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :liked_training_logs, through: :likes, source: :training_log
  has_many :bookmark_advices, through: :bookmarks, source: :advice
  has_many :body_compositions, dependent: :destroy

  has_many :active_relationships, class_name: 'Relationship', foreign_key: :following_id
  has_many :followings, through: :active_relationships, source: :follower

  has_many :passive_relationships, class_name: 'Relationship', foreign_key: :follower_id
  has_many :followers, through: :passive_relationships, source: :following

  validates :nickname, :email, presence: true
  validates :nickname, length: { maximum: 30 }
end

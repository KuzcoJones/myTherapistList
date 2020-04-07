class Therapist < ApplicationRecord
  belongs_to :user
  has_many :followers
  has_many :clients, through: :followers
end

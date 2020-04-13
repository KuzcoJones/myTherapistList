class Post < ApplicationRecord
  belongs_to :user
  # has_many :client_posts, through: :client
  # has_many :therapist_posts, through: :therapist
end

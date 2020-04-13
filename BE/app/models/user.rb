class User < ApplicationRecord
    has_many :posts 
    has_many :followers
    has_many :client_relationships, class_name: 'Follower', foreign_key: 'therapist_id', dependent: :destroy
    has_many :therapist_relationships, class_name: 'Follower', foreign_key: 'client_id', dependent: :destroy
    has_many :clients, through: :client_relationships, source: :client
    has_many :therapists, through: :therapist_relationships, source: :therapist
    has_many :therapist_posts, through: :therapists, source: :posts
    has_many :client_posts, through: :clients, source: :posts


    has_secure_password
    validates_presence_of :username
    validates :username, uniqueness: {
        case_sensitive: false
    }
end

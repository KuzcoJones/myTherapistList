# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Follower.destroy_all
Client.destroy_all
Therapist.destroy_all
Post.destroy_all
User.destroy_all
require 'faker'
# Faker::Name.name 
3.times{ User.create!(username: Faker::Name.middle_name, full_name: Faker::Name.name, password_digest: Faker::Color.color_name, isTherapist:true)
}

clientArr = []

susy = User.create!(username: 'Suzy', full_name:'Suzy Q', password: 'yellow', isTherapist: false)
3.times{ clientArr.push(User.create!(username: Faker::Name.middle_name, full_name: Faker::Name.name, password: Faker::Color.color_name, isTherapist:false))
}

3.times{ Therapist.create!(user: User.all.sample, bio: Faker::Hipster.sentences, location: Faker::Address.full_address, services:Faker::Hipster.word, specialties: Faker::Hipster.words)
}

3.times{ Client.create!(user: clientArr.sample, hobbies: Faker::Hipster.sentences, occupation:Faker::Hipster.words , bio:Faker::Hipster.word)
}

3.times{ Post.create!(user: User.all.sample, body: Faker::Hipster.sentences)
}

3.times{ Follower.create!(therapist: Therapist.all.sample, client:Client.all.sample)
}






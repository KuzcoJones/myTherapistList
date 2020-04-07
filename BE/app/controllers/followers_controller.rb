class FollowersController < ApplicationController
    def index 
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})
        user_id = decoded_token[0]['user_id']
        user = User.find(user_id)

        if user.isTherapist 
            therapist = Therapist.find_by(user: user)            
            followers = Follower.select{|follow| follow.therapist_id === therapist.id}
            client_followers = followers.map{ |follower| follower.client_id}
                render json: {followers: followers}
        else
            client = Client.find_by(user: user)
            followers = Follower.select{|follow| follow.therapist_id === therapist.id}
            render json: {followers: followers}
        end

       
    end 

    def create
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})

        user_id = decoded_token[0]['user_id']

        user = User.find(user_id)
# byebug
        if user.isTherapist 
            therapist = Therapist.find_by(user: user)
            follower = Follower.create!(therapist: therapist, client_id: params['client'])
        else
            client = Client.find_by(user:user)
            follower = Follower.create!(therapist: params['therapist'], client: client)
        end    
    end

    def show 
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})
        user_id = decoded_token[0]['user_id']
        user = User.find(user_id)

        if user.isTherapist 
            # list of client objs that follow the therapist.
            therapist = Therapist.find_by(user_id: user_id)
            followers = Follower.select{|follow| follow.therapist_id === therapist.id}
            clients_follower = followers.map{ |follow| Client.find(follow.client_id) }
            client_user_accounts = clients_follower.map{ |client| client.user}
            # byebug
            client_posts = client_user_accounts.map{ |client| client.posts }
            render json: {client_user_accounts => client_posts}
        else 
            client = Client.find_by(user_id: user_id)
            followers = Follower.select{|follow| follow.client_id === client.id}
            therapists_follower = followers.map{ |follow| Therapist.find(follow.therapist_id) }
            therapists_user_accounts = therapists_follower.map{ |therapist| therapist.user}
            render json: therapist_user_accounts


        end

    end

end

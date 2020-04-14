class FollowersController < ApplicationController
    def index 
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})
        user_id = decoded_token[0]['user_id']
        user = User.find(user_id)

        if user.isTherapist 
            therapist = Therapist.find_by(user: user)

            # followers = user.client_relationships
            byebug
            follows = Follower.select{|follow| follow.therapist_id === therapist.id }

            client_followers = follows.map{ |follower| follower.client_id }

            followers = client_followers.map{ |id| Client.find(id)}

                render json: followers.to_json(
                    only: [:id, :hobbies, :occupation, :bio],
                    include: [user: {only: [:username, :full_name, :isTherapist]}, followers: {only: [:id, :client_id, :therapist_id]}]
                )

               # render json: clients.to_json(
        #     only: [:id, :hobbies, :occupation, :bio],
        #     include: [user: {only: [:username, :full_name, :isTherapist]}, followers: {only: [:id, :client_id, :therapist_id]}]
        # )
        else
            # byebug
            client = Client.find_by(user: user)
            follows = Follower.select{|follow| follow.client_id === client.id }
            # byebug
            therapist_followers = follows.map{ |follower| follower.therapist_id };
            followers = therapist_followers.map{ |id| Therapist.find(id)};
            render json: followers.to_json(
                only: [:id, :location, :specialties, :services, :bio],
                include: [user: {only: [:username, :full_name, :isTherapist]}, followers: {only: [:id, :client_id, :therapist_id]}]
            )
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
            followers_list = Follower.select{ |follow| follow.therapist_id === therapist.id }.uniq

            followed_client_list = followers_list.map{ |follow| follow.client_id }

            all_clients = Client.all.reject {|client| followed_client_list.include? client.id }

            render json: all_clients.to_json(
                    only: [:id, :hobbies, :occupation, :bio],
                    include: [user: {only: [:username, :full_name, :isTherapist]}]
                )
        else
            # byebug
            client = Client.find_by(user:user)
            follower = Follower.create!(therapist_id: params['therapist_id'], client: client)            
            followers_list = Follower.select{ |follow| follow.client_id === client.id }.uniq
            followed_therapists_list = followers_list.map{ |follow| follow.therapist_id }
            all_therapists = Therapist.all.reject {|client| followed_therapists_list.include? client.id }

            render json: all_therapists.to_json(
                only: [:id, :hobbies, :occupation, :bio],
                include: [user: {only: [:username, :full_name, :isTherapist]}]
            )
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

    def destroy
        # byebug
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})
        user_id = decoded_token[0]['user_id']
        user = User.find(user_id)

        if user.isTherapist 
            follower = Follower.find(params['id'])
            follower.delete
            therapist = Therapist.find_by(user: user)            
            follows = Follower.select{|follow| follow.therapist_id === therapist.id }
            client_followers = follows.map{ |follower| follower.client_id }

            followers = client_followers.map{ |id| Client.find(id)}


                render json: followers.to_json(
                    only: [:id, :hobbies, :occupation, :bio],
                    include: [user: {only: [:username, :full_name, :isTherapist]}, followers: {only: [:id, :client_id, :therapist_id]}]
                )

            else
                # byebug
                follower = Follower.find(params['id'])
            follower.delete

            client = Client.find_by(user: user)            
            follows = Follower.select{|follow| follow.client_id === client.id }
            therapist_followers = follows.map{ |follower| follower.therapist_id}
    
            followers = therapist_followers.map{ |id| Therapist.find(id)}
    
    # byebug
                render json: followers.to_json(
                    only: [:id, :location, :services, :bio, :specialties],
                    include: [user: {only: [:username, :full_name, :isTherapist]}, followers: {only: [:id, :client_id, :therapist_id]}]
                )
            end

            
     end


end

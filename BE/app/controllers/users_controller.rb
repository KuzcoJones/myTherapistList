class UsersController < ApplicationController
    wrap_parameters :user, include: [:username, :password,:full_name, :isTherapist, :bio, :location, :services, :location, :specialty, :hobbies, :occupation]

    def index 
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})
        user_id = decoded_token[0]['user_id']
        user = User.find(user_id)
        
        if user.isTherapist
            # get users that are clients
            clients  = User.all.select{ |user| user.isTherapist === false}

            followers_list = Follower.select{|follow| follow.therapist_id === user.id }
            
            followed_client_list = followers_list.map{ |follow| follow.client_id }
            
            all_clients = clients.reject {|client| followed_client_list.include? client.id }
    # byebug
            
            render json: all_clients.to_json(
                only: [:full_name, :id, :hobbies, :occupation, :bio]
                )
            else
                # get all the users that are therapists
            therapists = User.all.select{|user| user.isTherapist === true}

            followers_list = Follower.select{ |follow| follow.client_id === user.id }.uniq

            followed_therapist_list = followers_list.map{ |follow| follow.therapist_id }

            all_users = therapists.reject {|therapist| followed_therapist_list.include? therapist.id }
# byebug
           

            render json: all_users.to_json(
                only: [:id, :full_name, :location, :specialty, :services]
            )
        end
    end

    def create
        
        # byebug
        user = User.create!(user_params)
        
        payload = { user_id: user.id }
        token = JWT.encode(payload, 'secret', 'HS256')
        
        render json: { user: user, id: user.id, username: user.username, token: token}
        end

    def show 
        # byebug
        token = request.headers[:Authorization].split(' ')[1]
        
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})

        user_id = decoded_token[0]['user_id']

        user = User.find(user_id)
        if user 
            render json: { user: user, id: user.id, username: user.username, token: token}
        else
            render json: {error: 'Invalid Token'}, status: 401
        end
    end

        private
        def user_params
            params.require(:user).permit(:username, :password, :full_name, :isTherapist, :bio, :location, :services, :location, :specialty, :hobbies, :occupation)

        end

    

end

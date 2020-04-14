class UsersController < ApplicationController
    wrap_parameters :user, include: [:username, :password,:full_name, :isTherapist, :bio, :location, :services, :location, :specialty, :hobbies, :occupation]

    def index 
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})
        user_id = decoded_token[0]['user_id']
        user = User.find(user_id)

        if user.isTherapist

            followers_list = Follower.select{|follow| follow.therapist_id === user.id }

            followed_client_list = followers_list.map{ |follow| follow.client_id }

            all_clients = User.all.reject {|client| followed_client_list.include? client.id }
            byebug

            render json: all_clients.to_json(
                only: [:id, :hobbies, :occupation, :bio],
                include: [user: {only: [:username, :full_name, :isTherapist]}]
            )
        else
           
            
            followers_list = Follower.select{ |follow| follow.client_id === user.id }.uniq

            followed_therapist_list = followers_list.map{ |follow| follow.therapist_id }

            all_users = User.all.reject {|therapist| followed_therapist_list.include? therapist.id }

           

            render json: all_users.to_json(
                only: [:id, :location, :specialties, :services],
                include: [user: {only: [:username, :full_name, :isTherapist]}]
            )
        end
    end

    def create
        
        user = User.create!(user_params)
        
        payload = { user_id: user.id }
        token = JWT.encode(payload, 'secret', 'HS256')
        # byebug
        
        render json: { id: user.id, username: user.username, token: token}
        end

    def show 
        token = request.headers[:Authorization].split(' ')[1]
        
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})

        user_id = decoded_token[0]['user_id']

        user = User.find(user_id)

        if user 
            render json: { id: user.id, username: user.username, token: token}
        else
            render json: {error: 'Invalid Token'}, status: 401
        end
    end

        private
        def user_params
            params.require(:user).permit(:username, :password, :full_name, :isTherapist, :bio, :location, :services, :location, :specialty, :hobbies, :occupation)

        end

    

end

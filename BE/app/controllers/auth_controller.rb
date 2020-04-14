class AuthController < ApplicationController

    def create
        user = User.find_by(username: params[:username])

        # byebug
        
        
            
            if user && user.authenticate(params[:password])
                if user.isTherapist === false
            render json: user.to_json(
                    only: [:id, :hobbies, :occupation, :isTherapist], include: [therapists: {only: [:username, :services, :specialty, :full_name, :bio]},
                    therapist_posts:{only:[:user, :body]}])

            else 
                render json: user.to_json(
                    only: [:id, :services, :specialty, :bio, :isTherapist], include: [clients: {only: [:username, :hobbies, :occupation, :full_name, :bio]},
                    client_posts:{only:[:user, :body]}])
                end
            end
        end
    
    def show 
        
        token = request.headers[:Authorization].split(' ')[1]
        # byebug

        # JWT.decode(token, 'my_s3cr3t', true, algorithm: 'HS256')
        decoded_token = JWT.decode(token, 'secret', true, algorithm: 'HS256')

        user_id = decoded_token[0]['user_id']
        isTherapist = decoded_token[1]['isTherapist']

        user = User.find(user_id)

        if user 
            User.find[user_id]
            if user.isTherapist 

            

            
            render json: user.to_json(

                only: [:id, :services, :specialty, :bio, :location], include: [clients: {only: [:username,:full_name, :bio]}]
                # only: [:id, :services, :specialty, :bio, :location],
                #  include: [clients:{only: [:username, :full_name, :occupation, :hobbies, :bio]} client_posts:{only: [body: user:]}]
            )

            else

                client = Client.find_by(user: user)
                render json: { id: user.id, isTherapist: user.isTherapist, username: user.username, client: client}
            end
        else
            render json: {error: 'Invalid Token'}, status: 401
        end
    end


end
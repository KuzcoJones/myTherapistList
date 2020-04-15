class AuthController < ApplicationController

    def create
        user = User.find_by(username: params[:username])
        

        payload = { user_id: user.id }
        token = JWT.encode(payload, 'secret', 'HS256')
        
        
            
            if user && user.authenticate(params[:password])
                render json: {token: token}
            end

        end
    
    def show 
        
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, algorithm: 'HS256')
        user_id = decoded_token[0]['user_id']
        user = User.find(user_id)
        if user 
            if user.isTherapist === false
            render json: user.to_json(
                only: [:id, :bio, :hobbies, :occupation, :isTherapist], include: [therapists: {only: [:id, :username, :services, :specialty, :full_name, :bio]},
                therapist_posts:{only:[:user_id, :body]}])
            else
                render json: user.to_json(
                    only: [:id, :bio, :services, :specialty, :bio, :isTherapist, :location], include: [clients: {only: [:username, :hobbies, :occupation, :full_name, :bio]},
                    client_posts:{only:[:user, :body]}])
            end
        else
            render json: {error: 'Invalid Token'}, status: 401
        end
    end


end
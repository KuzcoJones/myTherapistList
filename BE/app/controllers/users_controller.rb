class UsersController < ApplicationController
    def create
        
        user = User.create!(
            username: params['username'], 
            password: params['password'],
            full_name:params['full_name'], isTherapist: params['isTherapist']
            )
            
        payload = { user_id: user.id }
        token = JWT.encode(payload, 'secret', 'HS256')

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
            params.require(:user).permit(:username, :password, :full_name, :isTherapist)

        end

    

end

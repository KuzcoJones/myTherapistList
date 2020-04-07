class TherapistsController < ApplicationController

    def create 
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})
        
        user_id = decoded_token[0]['user_id']
        
        user = User.find(user_id)
        
       
        therapist = Therapist.create!(user: user, bio: params['bio'], location: params['location'], services: params['services'], specialties: params['specialties'])

        
        
        payload = { user_id: user.id, isTherapist: user.isTherapist, therapist_id: therapist.id }
        
        token = JWT.encode(payload, 'secret', 'HS256')

        render json: { id: user.id, isTherapist: user.isTherapist, username: user.username, therapist_id: therapist.id, token: token}
        # check and see if able to use user and strong params.
    end 

    def index
        # token = request.headers[:Authorization].split(' ')[1]

        # decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})

        # user_id = decoded_token[0]['user_id']

        # user = User.find(user_id)
# byebug
        therapists = Therapist.all
        render json: therapists.to_json(only: [:id, :bio, :location, :services, :specialties],
            include: [user: {only: [:id, :username, :full_name, :isTherapist]}, followers: {only: [:client_id, :therapist_id]}])
      end

    #  create a custome route to grab profile for one therapist
    

    def show
        
        therapist = Therapist.find(params['id'])
       
        render json: therapist.to_json(only: [:id, :bio, :location, :services, :specialties],
            include: [user: {only: [:id, :username, :full_name, :isTherapist]}, followers: {only: [:client_id, :therapist_id]}])
    end

    def update 
        therapist = Therapist.find(params[:id])
        therapist.update(therapist_params)
        
        # render message of success
        render json: therapist.to_json(
            only: [:id, :bio, :location, :services, :specialties])
    end

    private 
    def therapist_params
        params.require(:therapist).permit(:bio, :location, :services, :specialties)
    end 
    
end

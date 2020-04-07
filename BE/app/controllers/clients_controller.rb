class ClientsController < ApplicationController
    def index
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})
        user_id = decoded_token[0]['user_id']
        user = User.find(user_id)

        if user.isTherapist
            therapist = Therapist.find_by(user: user)
            followers_list = Follower.select{ |follow| follow.therapist_id === therapist.id }

            followed_client_list = followers_list.map{ |follow| follow.client_id }

            all_clients = Client.all.reject {|client| followed_client_list.include? client.id }

            



            # byebug
            # client_list = new_client_list.map { |follow| follow.client_id }
            render json: all_clients.to_json(
                    only: [:id, :hobbies, :occupation, :bio],
                    include: [user: {only: [:username, :full_name, :isTherapist]}, followers: {only: [:client_id, :therapist_id]}]
                )
        else
            client = Client.find_by(user: user)
            new_therapist_list = Follower.select{ |follow| follow.client_id != client.id }
            render json: {new_therapist_list: new_therapist_list}
        end

        # clients  = Client.all
        # render json: clients.to_json(
        #     only: [:id, :hobbies, :occupation, :bio],
        #     include: [user: {only: [:username, :full_name, :isTherapist]}, followers: {only: [:client_id, :therapist_id]}]
        # )
    end

    def create
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})

        user_id = decoded_token[0]['user_id']

        user = User.find(user_id)

        client = Client.create(:user[user], client_params)

        render json: clients.to_json(
            only: [:id, :hobbies, :occupation, :bio],
            include: [user: {only: [:username, :full_name, :isTherapist]}, followers: {only: [:client_id, :therapist_id]}]
        )
    end

    def show
        client = Client.find(params['id'])
        render json: client.to_json(
            only: [:id, :hobbies, :occupation, :bio],
            include: [user: {only: [:id, :username, :full_name, :isTherapist]}, followers: {only: [:client_id, :therapist_id]}]
        )
    end

    def update 
        client = Client.find(params[:id])
        client.update(client_params)
        # render message of success of editing.
        render json: client.to_json(only: [:id, :hobbies, :occupation, :bio])
    end

    private 
    def client_params
        params.require(:client).permit(:bio, :occupation, :hobbies)
    end


end

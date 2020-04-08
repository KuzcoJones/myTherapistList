class PostsController < ApplicationController
    def index 
        token = request.headers[:Authorization].split(' ')[1]
        # byebug
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})

        user_id = decoded_token[0]['user_id']
        user = User.find(user_id)

        posts = Post.select{|post| post.user_id === user_id}
        render json: { posts: posts }
    end

    def create 
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})

        user_id = decoded_token[0]['user_id']

        user = User.find(user_id)
    # byebug
        post = Post.create(user:user, body: params['post_body'])
        render json: {post: post}
    end

    def update
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})

        user_id = decoded_token[0]['user_id']

        user = User.find(user_id)

        # byebug
        post = Post.find(params['id'])
        post.update(user: user, body: params['postBody'])
        posts = Post.select{|post| post.user_id === user_id}
        render json: {posts: posts}
    end

    def destroy 
        token = request.headers[:Authorization].split(' ')[1]
        # byebug
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})

        user_id = decoded_token[0]['user_id']
        user = User.find(user_id)

        
        post = Post.find(params['id'])
        post.destroy
        posts = Post.select{|post| post.user_id === user_id}
        render json: {posts: posts}
    end

    private 
    def post_params
        params.require(:post).permit(:body)
    end

end

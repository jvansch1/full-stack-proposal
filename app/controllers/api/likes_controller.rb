class Api::LikesController < ApplicationController

  def index
    @likes = Like.all
  end

  def create
    @like = Like.new(like_params)
    if @like.save
      render 'api/likes/show'
    else
      render json: @like.errors, status: 422
    end
  end

  def show
    @like = Like.find(params[:id])
  end

  private

  def like_params
    params.require(:like).permit(:user_id, :checkin_id)
  end
end

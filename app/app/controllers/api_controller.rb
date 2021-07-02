class ApiController < ApplicationController
  skip_before_action :authenticate_staging
  protect_from_forgery with: :null_session
  skip_before_action :check_for_force_password_change
  before_action :authenticate_request

private

  def authenticate_request
    @api_key = ApiKey.active.find_by(key: params[:key], secret: request.headers['X-Api-Secret'])

    if @api_key
      @user = @api_key.user
    else
      head :unauthorized
      return false
    end
  end
end

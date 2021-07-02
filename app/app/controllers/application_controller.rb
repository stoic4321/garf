class ApplicationController < ActionController::Base
  before_action :authenticate_staging
  before_action :check_for_force_password_change
  before_action :set_unity_environment

  private

  def check_for_force_password_change
    if current_user && current_user.force_password_change
      flash[:notice] = "Please reset your password."
      redirect_to edit_user_password_path(
        reset_password_token: current_user.get_reset_password_token
      )
    end
  end

  def authenticate_staging
    if Rails.env.staging? && ENV["AUTH_USERNAME"] && ENV["AUTH_PASSWORD"]
      authenticate_or_request_with_http_basic do |username, password|
        ActiveSupport::SecurityUtils.secure_compare(::Digest::SHA256.hexdigest(username), ::Digest::SHA256.hexdigest(ENV["AUTH_USERNAME"])) &
        ActiveSupport::SecurityUtils.secure_compare(::Digest::SHA256.hexdigest(password), ::Digest::SHA256.hexdigest(ENV["AUTH_PASSWORD"]))
      end
    end
  end

  def set_unity_environment
    @unity_environment = params[:env] ? params[:env] : 'Build'
  end
end

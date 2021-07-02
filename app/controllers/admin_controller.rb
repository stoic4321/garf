class AdminController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin
  before_action :set_title

private

  def require_admin
    redirect_to root_path unless current_user.is_admin
  end

  def set_title
    @title = ["Admin", controller_name, action_name]
  end
end

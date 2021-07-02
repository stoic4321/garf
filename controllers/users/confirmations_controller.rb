# frozen_string_literal: true

class Users::ConfirmationsController < Devise::ConfirmationsController
  skip_before_action :check_for_force_password_change

  # # GET /resource/confirmation/new
  # def new
  #   super
  # end

  # # POST /resource/confirmation
  # def create
  #   super
  # end

  # # GET /resource/confirmation?confirmation_token=abcdef
  # def show
  #   super
  # end

  protected

  # # The path used after resending confirmation instructions.
  # def after_resending_confirmation_instructions_path_for(resource_name)
  #   super(resource_name)
  # end

  # The path used after confirmation.
  def after_confirmation_path_for(resource_name, resource)
    if resource.force_password_change
      edit_user_password_path(reset_password_token: resource.get_reset_password_token)
    else
      super(resource_name, resource)
    end
  end
end

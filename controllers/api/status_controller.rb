class Api::StatusController < ApiController
  skip_before_action :authenticate_request

  def index
    render json: {status: "Active", timestamp: Time.now}
  end
end

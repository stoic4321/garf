require 'rails_helper'

RSpec.describe "Api::Status", type: :request do
  let(:api_key) { create(:api_key) }

  #
  # Index
  #

  describe "index" do
    context "without a valid ApiKey" do
      before(:each) do
        get "/api/OICU812/status", params: {}, headers: {'X-Api-Secret' => "Douglas Adams"}, as: :json
      end

      it "responds 401" do
        expect(response.status).to eq(401)
      end
    end

    context "with a valid ApiKey" do
      before(:each) do
        get "/api/#{api_key.key}/status", params: {}, headers: {'X-Api-Secret' => api_key.secret}, as: :json
      end

      it "responds 200" do
        expect(response.status).to eq(200)
      end

      it "returns an Active status with a timestamp" do
        expect(json_response["status"]).to eq("Active")
        expect(json_response["timestamp"]).not_to be_nil
      end
    end
  end
end
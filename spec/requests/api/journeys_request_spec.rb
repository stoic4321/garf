require 'rails_helper'

RSpec.describe "Api::Journeys", type: :request do
  let!(:api_key) { create(:api_key) }
  let(:journey) { create(:journey, user: api_key.user) }
  let(:journey_attributes) { %w(id name data) }

  #
  # Create
  #

  describe "POST /journeys" do
    context "without a valid ApiKey" do
      before(:each) do
        post "/api/OICU812/journeys", params: {}, headers: {'X-Api-Secret' => "Douglas Adams"}, as: :json
      end

      it "responds 401" do
        expect(response.status).to eq(401)
      end
    end

    context "with a valid ApiKey and params" do
      before(:each) do
        post "/api/#{api_key.key}/journeys",
          params: {
            "journey": {
              "name": "Test Journey",
              "data": {
                "1" => true,
                "2" => false,
                "3" => "TacocaT"
              }
            }
          },
          headers: {'X-Api-Secret' => api_key.secret},
          as: :json
      end

      it "responds 200" do
        expect(response.status).to eq(200)
      end

      it "returns the Journey" do
        response_journey = json_response["journey"]
        expect(response_journey["id"]).not_to be_nil
        expect(response_journey["name"]).to eq("Test Journey")
      end
    end

    context "with a valid ApiKey but invalid params" do
      before(:each) do
        post "/api/#{api_key.key}/journeys",
          params: {
            "journey": {
              "name": "",
              "data": {
                "1" => true,
                "2" => false,
                "3" => "TacocaT"
              }
            }
          },
          headers: {'X-Api-Secret' => api_key.secret},
          as: :json
      end

      it "responds 200" do
        expect(response.status).to eq(200)
      end

      it "returns the correct errors" do
        expect(json_response["errors"]).not_to be_nil
        expect(json_response["errors"]["name"]).to eq(["can't be blank"])
      end
    end
  end

  #
  # Update
  #

  describe "PUT /journeys" do
    before(:each) { journey }

    context "without a valid ApiKey" do
      before(:each) do
        put "/api/OICU812/journeys/#{journey.id}", params: {}, headers: {'X-Api-Secret' => "Douglas Adams"}, as: :json
      end

      it "responds 401" do
        expect(response.status).to eq(401)
      end
    end

    context "with a valid ApiKey and params" do
      before(:each) do
        put "/api/#{api_key.key}/journeys/#{journey.id}",
          params: {
            "journey": {
              "name": "Test Journey Revised",
              "data": {
                "1" => false,
                "2" => true,
                "3" => "So many dynamoS"
              }
            }
          },
          headers: {'X-Api-Secret' => api_key.secret},
          as: :json
      end

      it "responds 200" do
        expect(response.status).to eq(200)
      end

      it "returns the Journey" do
        response_journey = json_response["journey"]
        expect(response_journey["id"]).not_to be_nil
        expect(response_journey["name"]).to eq("Test Journey Revised")
        expect(response_journey["data"]["3"]).to eq("So many dynamoS")
      end
    end

    context "with a valid ApiKey but invalid params" do
      before(:each) do
        put "/api/#{api_key.key}/journeys/#{journey.id}",
          params: {
            "journey": {
              "name": "",
              "data": {
                "1" => false,
                "2" => true,
                "3" => "So many dynamoS"
              }
            }
          },
          headers: {'X-Api-Secret' => api_key.secret},
          as: :json
      end

      it "responds 200" do
        expect(response.status).to eq(200)
      end

      it "returns the correct errors" do
        expect(json_response["errors"]).not_to be_nil
        expect(json_response["errors"]["name"]).to eq(["can't be blank"])
      end
    end
  end
end

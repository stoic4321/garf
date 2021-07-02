require 'rails_helper'

RSpec.describe "Api::Structures", type: :request do
  let!(:api_key) { create(:api_key) }
  let(:structure) { create(:structure) }
  let(:child) { create(:structure, parent: structure) }
  let(:structure_attributes) do
    %w(id name flavor text data picker depth)
  end

  #
  # Index
  #

  describe "Conditions" do
    context "without a valid ApiKey" do
      before(:each) do
        get "/api/OICU812/conditions", params: {}, headers: {'X-Api-Secret' => "Douglas Adams"}, as: :json
      end

      it "responds 401" do
        expect(response.status).to eq(401)
      end
    end

    context "with a valid ApiKey" do
      before(:each) do
        child
        create(:action, parent: child)
        get "/api/#{api_key.key}/conditions", params: {}, headers: {'X-Api-Secret' => api_key.secret}, as: :json
      end

      it "responds 200" do
        expect(response.status).to eq(200)
      end

      it "returns an Array of structures" do
        expect(json_response["structures"]).to be_a_kind_of(Array)
      end

      it "returns a structure" do
        response_structure = json_response["structures"][0]
        structure_attributes.each do |attr|
          expect(response_structure[attr]).to eq(structure.send(attr))
        end
      end

      it "returns a structure's children" do
        response_structure = json_response["structures"][0]
        expect(response_structure["children"]).to be_a_kind_of(Array)
        expect(response_structure["children"].length).to eq(1)
        response_child = response_structure["children"][0]
        structure_attributes.each do |attr|
          expect(response_child[attr]).to eq(child.send(attr))
        end
      end
    end
  end

  #
  # Actions
  #

  describe "Actions" do
    context "without a valid ApiKey" do
      before(:each) do
        get "/api/OICU812/actions", params: {}, headers: {'X-Api-Secret' => "Douglas Adams"}, as: :json
      end

      it "responds 401" do
        expect(response.status).to eq(401)
      end
    end

    context "with a valid ApiKey" do
      before(:each) do
        child
        @action = create(:action, parent: child)
        get "/api/#{api_key.key}/actions", params: {}, headers: {'X-Api-Secret' => api_key.secret}, as: :json
      end

      it "responds 200" do
        expect(response.status).to eq(200)
      end

      it "returns an Array of structures" do
        expect(json_response["structures"]).to be_a_kind_of(Array)
      end

      it "returns a structure" do
        response_structure = json_response["structures"][0]
        structure_attributes.each do |attr|
          expect(response_structure[attr]).to eq(child.send(attr))
        end
      end

      it "returns a structure's children" do
        response_structure = json_response["structures"][0]
        expect(response_structure["children"]).to be_a_kind_of(Array)
        expect(response_structure["children"].length).to eq(1)
        response_child = response_structure["children"][0]
        structure_attributes.each do |attr|
          expect(response_child[attr]).to eq(@action.send(attr))
        end
      end
    end
  end
end

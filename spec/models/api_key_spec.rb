require 'rails_helper'

RSpec.describe ApiKey, type: :model do

  #
  # Validations
  #

  describe "validations" do
    subject { create(:api_key) }

    it { should validate_presence_of(:key) }
    it { should validate_presence_of(:secret) }
  end

  #
  # Associations
  #

  describe "associations" do
    subject { create(:api_key) }

    it { should belong_to(:user).optional }
  end
end

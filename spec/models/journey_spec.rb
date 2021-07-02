require 'rails_helper'

RSpec.describe Journey, type: :model do

  #
  # Validations
  #

  describe "validations" do
    subject { create(:journey) }

    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:data) }
  end

  #
  # Associations
  #

  describe "associations" do
    subject { create(:journey) }

    it { should belong_to(:user) }
  end
end

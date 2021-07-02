require 'rails_helper'

RSpec.describe User, type: :model do
  #
  # Validations
  #

  describe "validations" do
    subject { create(:user) }

    it { should validate_presence_of(:role) }

    User.roles.keys.each do |role|
      it "allows #{role} as a role" do
        subject.role = role
        expect(subject).to be_valid
        expect(subject.validate_role(role)).to be_truthy
      end
    end

    FFaker::Lorem.words.each do |role|
      it "does not allow #{role} as a role" do
        expect{ subject.role = role }.to raise_exception(ArgumentError)
      end
    end
  end

  #
  # Associations
  #

  describe "associations" do
    subject { create(:journey) }

    it { should belong_to(:user) }
  end
end

class Journey < ApplicationRecord

  #
  # Validations
  #

  validates :name, presence: true
  validates :data, presence: true

  #
  # Associations
  #

  belongs_to :user

  #
  # Generators
  #

  after_initialize :check_token

  def check_token
    self.token = SecureRandom.uuid unless token.present?
  end

end

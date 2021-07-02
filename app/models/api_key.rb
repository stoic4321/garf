class ApiKey < ApplicationRecord

  #
  # Validations
  #

  validates :key, presence: true
  validates :secret, presence: true, uniqueness: { scope: :key }

  #
  # Associations
  #

  belongs_to :user, optional: true

  #
  # Scopes
  #

  scope :active, ->{ where(active: true) }

  #
  # Generators
  #

  after_initialize :check_key_and_secret

  def check_key_and_secret
    unless key.present? && secret.present?
      self.key = SecureRandom.uuid
      self.secret = SecureRandom.hex
    end
  end

  #
  # Finders
  #

  def self.tanjo_admin
    ApiKey.joins(:user).where("users.email" => "admin@tanjo.ai").first
  end

end

class User < ApplicationRecord

  #
  # Validations
  #

  validates :role, presence: true

  #
  # Associations
  #

  has_many :api_keys, dependent: :destroy
  has_many :journeys

  #
  # Devise
  #

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :lockable, :timeoutable, :trackable
         #, :omniauthable

  # Wrap set_reset_password_token in a public method so that we
  # can redirect to the reset password screen if the user was
  # created by an admin and/or force_password_change is true.
  # Relies on the trust that email accounts are secure.
  def get_reset_password_token
    set_reset_password_token
  end

  def password_was_reset!
    update(force_password_change: false)
  end

  #
  # User Roles
  #

  enum role: [
    :user,
    :health_architect,
    :system_admin
  ]

  def is_health_architect
    is_admin || validate_role(:health_architect)
  end

  def is_admin
    validate_role(:system_admin)
  end

  def validate_role role
    self.role && self.role.to_sym === role.to_sym
  end

  #
  # Decorators
  #

  def display_name
    self.name || self.email
  end

  def display_role
    self.role.titleize
  end

  def fetch_api_key
    self.api_keys.any? ? self.api_keys.active.try(:first) : self.api_keys.create
  end
end

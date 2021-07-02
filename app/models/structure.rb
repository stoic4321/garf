class Structure < ApplicationRecord
  acts_as_nested_set order_column: "name", counter_cache: :children_count

  #
  # Validations
  #

  validates :name, presence: true
  validates :flavor, presence: true
  validates :handle, presence: true, uniqueness: true

  #
  # Callbacks
  #

  before_save :format_data
  before_validation :build_handle

  def display_flavor
    case self.flavor
    when 'condition_group'
      'Group'
    when 'action'
      'Action'
    else
      self.flavor.try(:capitalize) || '?Flavor?'
    end
  end

  def flavor_letter()
    display_flavor()[0].downcase
  end

  def format_data()
    begin
      # self.data = eval(self.data).to_json if self.data.is_a?(String) # DANGER!!!!
      self.data = JSON.parse(self.data) if self.data.is_a?(String)
    rescue => e
      self.errors.add(:data, e.message)
    end
  end

  def data_hash()
    begin
      if self.data.is_a?(String)
        JSON.parse(self.data)
      else
        self.data
      end
    rescue => e
      self.errors.add(:data, e.message)
    end
  end

  def gen_handle()
    par_nm   = ((self.parent && self.parent.flavor_letter!='g' && (self.parent.name[0..3]+'_')) || '')
    gran_nm  = ((self.parent && self.parent && self.parent.parent && self.parent.parent.flavor_letter!='g' && (self.parent.parent.name[0..3]+'_')) || '')
    nam    = self.name.split(' ')[0..1].join('_')
    hdl = "\##{self.flavor_letter}_#{gran_nm[0..4]}#{par_nm[0..4]}#{nam}".downcase.gsub(/[()\.:\/\\]/,'')
    need_sfx = (Structure.where(handle:hdl).any?) && (self.handle!=hdl)
    hdl + ((need_sfx) ? SecureRandom.alphanumeric : '')
  end

  def build_handle()
    self.handle = self.gen_handle() unless self.handle.present?
  end

  #
  # ENUMS
  #

  enum flavor: [:condition, :action, :condition_group, :risk]

end

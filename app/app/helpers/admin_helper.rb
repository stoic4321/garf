module AdminHelper

  def admin_cms_options
    {
      users: 'users',
      api_keys: 'api_keys',
      structures: 'structures',
      journeys: 'journeys'
    }
  end

  def admin_link_classes value
    "nav-link #{controller_name.include?(value) ? "active" : "inert"}"
  end

  def admin_dashboard_cards
    %w(
      user
      api_key
      structure
      journey
    )
  end

  def admin_formula_options
    Dir.glob("#{Rails.root}/app/services/formulas/*.rb").collect{|file| /\b(\w+)\.rb$/.match(file)[1]}
  end

end
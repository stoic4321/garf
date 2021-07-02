module ApplicationHelper

  #
  # Layout Helpers
  #

  def meta_title
    title = []
    title << "Health Journeys"
    title << @title if @title
    title << Rails.env unless Rails.env.production?
    title.flatten.map{|text| text.titleize}.join(' | ')
  end

  def active_state? key
    @location === key
  end

  def active_state key
    active_state?(key) ? "active" : "inert"
  end

  #
  # Bootstrap Helpers
  #

  def flash_class(level)
    case level.to_sym
        when :notice then "alert-info"
        when :success then "alert-success"
        when :error then "alert-danger"
        when :alert then "alert-danger"
        else "alert-#{level}"
    end
  end

  def bootstrap_devise_error_messages!
    return '' if resource.errors.empty?

    messages = resource.errors.full_messages.map { |message| content_tag(:li, message) }.join
    sentence = I18n.t(
      'errors.messages.not_saved',
      count: resource.errors.count,
      resource: resource.class.model_name.human.downcase
    )

    html = <<-HTML
    <div class="alert alert-danger">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <h4 class="alert-heading">#{sentence}</h4>
      <ul class="mb-0">#{messages}</ul>
    </div>
    HTML

    html.html_safe
  end

  def print_json json
    simple_format(json.to_s.gsub(/(\{|",)/, '\\1<br />').gsub(/\}/, '<br />}')).html_safe
  end

  def safe_top_keys(hash)
    begin
      hash = JSON.parse(hash) if (hash.is_a?(String))
      ret = hash.keys.join(', ')
    rescue => e
      ret = 'JSON Syntax Error'
    end
    ret
  end

end

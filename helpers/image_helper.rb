module ImageHelper
  ICON_FOLDER = "icons"

  #
  # Logo
  #

  def logo_image classes: nil
    image_tag(
      "logos/3dbiome.png",
      alt: "3DBioMe Logo #{classes}",
      class: "cc-logo position-relative"
    )
  end

  #
  # Icons
  #

  def icon name, classes: nil
    image_tag(
      "icons/Icon_#{name}.svg",
      alt: name.titleize,
      class: "cc-icon cc-icon__#{name.parameterize} #{classes}"
    )
  end

end

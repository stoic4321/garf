json.cache! [:api, structure, @flavor], expires_in: 10.minutes do
  json.(structure, :id, :name, :flavor, :parent_id, :text, :data, :picker, :depth)
  # If "action" include ALL children
  if ((@flavor == "action") || (@flavor == 'all')) && structure.children.any?
    json.children structure.children, partial: "api/structures/structure", as: :structure
  # If "condition" only include conditions, not actions
  elsif @flavor == "condition" && structure.children.condition.any?
    json.children structure.children.condition, partial: "api/structures/structure", as: :structure
  end
end
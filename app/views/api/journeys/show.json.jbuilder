if @journey.valid?
  json.journey do
    json.(@journey, :id, :name, :data, :token, :created_at, :updated_at)
  end
else
  json.errors @journey.errors
end
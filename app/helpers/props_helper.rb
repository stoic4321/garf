module PropsHelper
  CACHE_EXPIRATION = 10.seconds # 10.minutes

  #
  # Highest Level -- Pass these to the component
  #

  def structures_props()
    Rails.cache.fetch([:structures_props], expires_in: CACHE_EXPIRATION) do
      Structure.roots.map {|structure| structure_props(structure)}
    end
  end

  def actions_props()
    Rails.cache.fetch([:actions_props], expires_in: CACHE_EXPIRATION) do
      Structure.find(Structure.action.pluck(Arel.sql("DISTINCT parent_id"))).map {|structure| structure_props(structure)}
    end
  end

  #
  # Lowest Level - Indiviual Objects
  #

  def structure_props( structure )
    Rails.cache.fetch([:structure_props, structure], expires_in: CACHE_EXPIRATION) do
      {
        id: structure.id,
        name: structure.name,
        handle: structure.handle,
        impacts: structure.impacts,
        ordering: structure.ordering,
        flavor: structure.flavor,
        data: structure.data,
        text: structure.text,
        picker: structure.picker,
        parent_id: structure.parent_id,
        children_count: structure.children_count,
        depth: structure.depth,
        active: structure.active,
        children: structure.children.map {|child| structure_props(child)}
      }
    end
  end

  def users_journeys_h
    js = (current_user && current_user.journeys) || []
    js.map do |j|
      Rails.cache.fetch([:users_journeys_h, j], expires_in: CACHE_EXPIRATION) do
        {
          id: j.id,
          name: j.name,
          data: j.data,
          token: j.token,
          updated_at: j.updated_at,
          username: j.user.try(:name)
        }
      end
    end
  end

  #
  # Javascript Web Token
  #

  def generate_jwt
    Rails.cache.fetch([:api_jwt_token, current_user], expires_in: CACHE_EXPIRATION) do
      api_key = current_user ? current_user.fetch_api_key : nil #: ApiKey.tanjo_admin
      if api_key
        payload = {key: api_key.key, secret: api_key.secret}.to_json
      else
        payload = {}
      end
      JWT.encode payload, ENV['JWT_SECRET'], 'HS256'
    end
  end
end
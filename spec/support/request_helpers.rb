module Requests
  module JsonHelpers
    def json_response
      @json_response ||= MultiJson.load(response.body)
    end

    def json_content_type
      @json_content_type ||= { "CONTENT_TYPE" => "application/json" }
    end
  end
end
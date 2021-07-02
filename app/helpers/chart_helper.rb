module ChartHelper

  def confidence_score_history county
    data = [
      ['Date', 'Score']
    ]

    county.confidence_scores.limit(30).each do |score|
      data << [score.date, score.display_score]
    end

    data
  end

end

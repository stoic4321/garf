export const filterMetricSubscores = (allMetrics, selectedMetric) => {
  return allMetrics.filter(met => met.parent_id === selectedMetric.id)
}

export const findScore = (allScores, metric) => {
  return allScores.filter(score => score.metric_id === metric.id)[0]
}

export const findMetricDescription = (score, metric) => {
  score = Math.round(score * 100)
  const [descriptionObject] = metric.descriptions.filter(description => score >= description.low && score <= description.high)
  return descriptionObject ? descriptionObject.description : false
}

export const filterMetrics = metrics => {
  return metrics.filter(metric => metric.depth === 1)
}

export const findMetricName = (metrics, id) => {
  let [filteredMetric] = metrics.filter(metric => metric.id === id)
  return filteredMetric.name
}

export const setScoresFromHash = (dashboardState, scoreHash) => {
  dashboardState.scores.forEach((score, index) => {
    if (index !== 24) {
      const newScore = scoreHash[score.metric_id] / 100
      // set new score
      dashboardState.scores[index].score = newScore
    }
  })

  dashboardState.simulatedScore = scoreHash[1] / 100
}
const green = '#94CC79'
const yellow = '#FFCB2B'
const red = '#F15B47'

export const lowScoreCeil = 50
export const medScoreCeil = 75

export const scoreToColor = score => {
  if (score < lowScoreCeil) return red
  if (score < medScoreCeil) return yellow
  if (score >= medScoreCeil) return green
}

export const inverseScoreToColor = score => {
  if (score < lowScoreCeil) return green
  if (score > medScoreCeil) return red
  return yellow
}
export const arrayToColor = (idx, len, bad) => {
  const score = ((parseInt(idx)/parseInt(len)) * 100)
  len = len - 1
  if (idx === 0) return '#ccc'
  if (score < 33) {
    if (bad === 'low') return red
    else return green
  }
  if (score < 66) return yellow
  if (score >= 66) {
    if (bad === 'low') return green
    else return red
  }
}

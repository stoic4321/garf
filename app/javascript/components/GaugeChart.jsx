import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { inverseScoreToColor, lowScoreCeil, medScoreCeil } from '../helpers/scoreToColor'

export const GaugeChartCols = ({ cols, ...bind }) => {
  return (
    <div className="row m-0 gauge-chart-container">
      <div className={`col-spacer`}>
        <div className={`gauge-chart`}>
          <GaugeChart {...bind}/>
        </div>
      </div>
      <div className={`col`}>
        {' '}
      </div>
    </div>
  )
}

const GaugeChart = ({ clz, score, isRiskGauge = false }) => {
  const bemTail = isRiskGauge ? '__risk' : ''
  return (
    <div className={`gauge-chart${bemTail}`}>
      <ReactEcharts option={buildOption(score)} style={{ width: '100px', height: '100px' }} />
    </div>
  )
}

export default GaugeChart

const gaugeText = (score) => {
  if (score < lowScoreCeil) return 'LOW\nRISK'
  if (score > medScoreCeil) return 'HIGH\nRISK'
  return 'MEDIUM\nRISK'
}

const buildOption = (score) => {
  return {
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    },
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            color: inverseScoreToColor(score)
          }
        },
        axisLine: {
          lineStyle: {
            width: 10,
            color: [[1, '#E4E5E6']]
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
          distance: 50
        },
        data: [
          {
            value: score,
            detail: {
              offsetCenter: ['0%', '0%']
            }
          }
        ],
        title: {
          fontSize: 14
        },
        detail: {
          fontSize: '0.8rem',
          lineHeight: 13,
          formatter: gaugeText(score)
        }
      }
    ]
  }
}

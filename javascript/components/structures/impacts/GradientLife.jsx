import React from 'react';

const genGradient = (arr, spread = 10) => {
  const clamp = (num, min = 0, max = 100) => (num <= min ? min : num >= max ? max : num);
  const hasTwo = arr.length > 1;
  const low = (hasTwo) ? arr[0] : (arr[0] - spread);
  const high = (hasTwo) ? arr[1] : (arr[0] + spread);
  return `#94cc79, #ffcb2b ${clamp(low)}%, #ffcb2b ${clamp(high)}%, #f15b47`;
};
export const GradientLife = ({ score, txt, spread = 10, clz, isMobile }) => (
  <div className={`${clz} page-header__health-gradient hidden-print ${isMobile ? '' : 'ml-2'}`}
    style={{ background: `linear-gradient(to right, ${genGradient([score], spread)})` }}
  >
    <p><strong>{txt}</strong></p>
  </div>
);

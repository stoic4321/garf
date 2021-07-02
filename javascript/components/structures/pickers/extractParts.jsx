import { scoreToColor, arrayToColor } from '../../../helpers/scoreToColor';

// Parser to extract a hex color per button (in the form of "Button Text##ff00ff")
//        or a % score that is then mapped to a color (ex: "Button Text%%65")
export const extractParts = (e, idx, len, bad) => {
  if (e && e.includes('%%')) {
    const parts = e.split('%%');
    // To do parseInt on scoreToColor
    return { word: parts[0], score: parts[1], color: scoreToColor(parts[1]) };
  } else if (e && e.includes('##')) {
    const parts = e.split('##');
    return { word: parts[0], color: '#' + parts[1] };
  } else if (bad) {
    // bad is false, low, or high
    return { word: e, color: arrayToColor(idx, len, bad) };
  }
  return { word: e };
};


export const merge = (o,x)=> ({...(o||{}), ...x})

//-----------||||||||||||||------------------------------------------------
export const everyKeyHasVal = (list, key, val) => list.map(x=>x[key]).every(x=>x==val)
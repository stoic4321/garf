export const truncateOnWord = (str, len, append) => {
  if (str.length < len) {
    return str
  } else {
    append = append || ""
    let newString = ""
    const strArray = str.split(" ")

    for (var i = 0; i < strArray.length; i++) {
      let word = strArray[i]
      if (`${newString} ${word}${append}`.trim().length < len) {
        newString = `${newString} ${word}`
      } else {
        break
      }
    }

    return `${newString}${append}`.trim()
  }
};
export const sortAlphabetically = (els, order) => {
  if (order === 'asc') {
    return els.sort((a, b) => a.name.localeCompare(b.name))
  } else {
    return els.sort((a, b) => a.name.localeCompare(b.name)).reverse()
  }
}

export const sortChronologically = (els, order) => {
  if (order === 'asc') {
    return els.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
  } else {
    return els.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at))
  }
}

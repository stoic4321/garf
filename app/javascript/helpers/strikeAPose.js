import Unity from './Unity'

const ensureKey = (hash, key, defValue) => {
  if (!hash[key]) hash[key] = defValue
}
//----------------------////////////-------------------
export default function strikeAPose(pose) {
  const isOk = (!!pose) && (Object.entries(pose).length > 0)
  console.log(`StrikeAPose() isOk=${isOk}`, pose )
  if (isOk) {
    ensureKey(pose, 'mesh',      '?')
    ensureKey(pose, 'markers',    [])
    ensureKey(pose, 'highlights', [])
    ensureKey(pose, 'hideShows',  [])
    ensureKey(pose, 'cameras',    [])
    ensureKey(pose, 'settings',   [])
    Unity.loadBody( JSON.stringify(pose) )
  }
}
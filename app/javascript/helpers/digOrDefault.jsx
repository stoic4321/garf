//-----------||||||||||||----------------------------------------
export const digOrDefault = (hash, key, deflt) => (
  (key && hash && hash[key] !== undefined) ? hash[key] : deflt
)
export const withMergeHash = ([hash, setHash]) => {
  const mergeToHash = (key, val) => setHash({ ...hash, [key]: val });
  return [hash, setHash, mergeToHash];
} // Usage: 
// const [thingy, setThingy, mergeToThingy] = withMergedHash( useState({} ))
// mergeToThingy('a', 'ace')
// mergeToThingy('b', 'bat')
// mergeToThingy('a', 'ant')
// thingy //---> {a:'nt', b:'bat'}

//----//////-------------------
const Unity = { 
  send:     (k,v) => (typeof UNITY !== 'undefined') && UNITY.SendMessage('[Bridge]', k, v+''),
  showDebug: (tf) => Unity.send('ShowDebug', tf),
  loadBody:(json) => Unity.send('LoadBody', json),
}

export default Unity
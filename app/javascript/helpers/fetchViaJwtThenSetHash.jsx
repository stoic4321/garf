import jwt from 'jsonwebtoken';

//----///////////////////////-----------------------------------------
export const fetchViaJwtThenSetHash = async (jwtHash, route, setHashFn) => {
  const decoded = jwt.verify(jwtHash, process.env.JWT_SECRET, (err, json) => {
    json = JSON.parse(json);
    return JSON.parse(json); // yes double parse for the win!!
  });
  const url = `/api/${decoded.key}/${route}`;
  const options = {
    method: 'GET',
    headers: { 'X-Api-Secret': decoded.secret }
  };
  const fetched = await fetch(url, options);
  const hash = await fetched.json();
  setHashFn(hash);
};

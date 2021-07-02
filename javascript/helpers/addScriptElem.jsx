export const addScriptElem = (fname) => {
  let script = document.createElement("script");
  script.src = fname;
  script.async = true;
  document.body.appendChild(script);
};

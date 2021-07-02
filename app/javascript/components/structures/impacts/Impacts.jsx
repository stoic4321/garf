import React from 'react';
import { digOrDefault } from "../../../helpers/digOrDefault";

export const Impacts = ({ item, store, impComps, markyComps }) => (item.impCompOs && item.impCompOs.map((ico) => {
  let Comp = digOrDefault(impComps, ico.baseVerb, ico.comp); // if verb has entry in impComps, use that Comp (EX: {say:MagicSay, if:DbgIf})
  // console.log({verb:ico.baseVerb,ico,impComps, Comp})
  return (
    Comp && <Comp {...{ ...ico, store, impComps, markyComps }} />
  );
}));

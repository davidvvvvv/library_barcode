import React, { useEffect, useState, useMemo } from "react";
import Label from "./Label";

import "./styles.css";

const Scope = props => {
  const scopeLetter = props.letter;
  const scopeFrom = props.fromNum;
  const scopeTo = props.toNum;
  const border = props.border;
  const digitRequired = props.digit;

  const lableArray = useMemo(() => {
    //const quan = scopeTo - scopeFrom + 1;
    const tempArray = [];
    for (let i = scopeFrom; i <= scopeTo; i++) {
      // console.log("i", i);
      let iString = i.toString();
      while (true) {
        if (iString.length >= digitRequired) break;
        iString = "0" + iString;
      }
      //tempArray.push(scopeLetter + iString);
      tempArray.push(
        <Label
          titleText="保良局余李慕芬紀念學校"
          barcodeValue={scopeLetter + iString}
          letter={scopeLetter}
          border={border}
        />
      );
      tempArray.push(
        <Label
          titleText="保良局余李慕芬紀念學校"
          barcodeValue={scopeLetter + iString}
          letter={scopeLetter}
          border={border}
        />
      );
    }
    //console.log(tempArray);
    return tempArray;
  }, [scopeFrom, scopeTo, scopeLetter, digitRequired, border]);

  useEffect(() => {
    //handleClickOpen();
  }, []);

  return <div className="Scope">{lableArray}</div>;
};

export default Scope;

import React, { useEffect, useContext, useMemo, useState } from "react";
import Scope from "./Scope";
import InputDialog from "./InputDialog";
import { DataContext } from "./DataContext";
import "./styles.css";

const Page = () => {
  //??const [letter, setLetter] = useContext(LetterContext);
  //??const [numFrom, setNumFrom] = useContext(NumFromContext);
  //??const [numTo, setNumTo] = useContext(NumToContext);
  const [dataObject, setDataObject] = useContext(DataContext);
  const digit = 5;

  const scopeList = useMemo(() => {
    const tempScopeList = [];
    //??let tempTotalPage = Math.round((numTo - numFrom + 1) / 24);
    let tempTotalPage = Math.round(
      (dataObject.numTo - dataObject.numFrom + 1) / 24
    );
    //?? if ((numTo - numFrom + 1) % 24 > 0) tempTotalPage = tempTotalPage + 1;
    if ((dataObject.numTo - dataObject.numFrom + 1) % 24 > 0)
      tempTotalPage = tempTotalPage + 1;
    //??let tempNumFrom = parseInt(numFrom);
    let tempNumFrom = parseInt(dataObject.numFrom);
    for (let currentPage = 1; currentPage <= tempTotalPage; currentPage++) {
      //??let scopeLastNum = parseInt(numTo);
      let scopeLastNum = parseInt(dataObject.numTo);
      //??if (tempNumFrom + 23 < parseInt(numTo)) scopeLastNum = tempNumFrom + 23;
      if (tempNumFrom + 23 < parseInt(dataObject.numTo))
        scopeLastNum = tempNumFrom + 23;
      //console.log("tempNumFrom", tempNumFrom);
      // console.log("scopeLastNum", scopeLastNum);
      tempScopeList.push(
        <Scope
          //??letter={letter}
          letter={dataObject.letter}
          fromNum={tempNumFrom}
          toNum={scopeLastNum}
          digit={digit}
          border={dataObject.border}
        />
      );
      //??tempNumFrom = parseInt(numFrom) + 24 * currentPage;
      tempNumFrom = parseInt(dataObject.numFrom) + 24 * currentPage;
      //console.log("tempNumFrom2", tempNumFrom);
    }
    return tempScopeList;
  }, [
    dataObject.numFrom,
    dataObject.numTo,
    dataObject.letter,
    dataObject.border,
    digit
  ]); //??[numFrom, numTo, letter, digit]);

  return (
    <div className="Page">
      <InputDialog />
      {scopeList}
    </div>
  );
};

export default Page;

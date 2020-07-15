import React, { useState, useEffect, createContext } from "react";

//??export const LetterContext = createContext();
//??export const NumFromContext = createContext();
//??export const NumToContext = createContext();
export const DataContext = createContext();

const DataContextProvider = props => {
  const initialData = {
    numFrom: 0,
    numTo: 0,
    letter: "",
    border: false
  };

  //??const [letter, setLetter] = useState("TR");
  //??const [numFrom, setNumFrom] = useState(0);
  //??const [numTo, setNumTo] = useState(0);
  const [dataObject, setDataObject] = useState(initialData);

  return (
    //<LetterContext.Provider value={[letter, setLetter]}>
    // <NumFromContext.Provider value={[numFrom, setNumFrom]}>
    //   <NumToContext.Provider value={[numTo, setNumTo]}>
    <DataContext.Provider value={[dataObject, setDataObject]}>
      {props.children}
    </DataContext.Provider>
    //   </NumToContext.Provider>
    //   </NumFromContext.Provider>
    // </LetterContext.Provider>
  );
};

export default DataContextProvider;

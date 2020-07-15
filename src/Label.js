import React, { useMemo } from "react";
import Barcode from "react-barcode";
import "./styles.css";

const Label = props => {
  const titleText = props.titleText;
  const barcodeValue = props.barcodeValue;
  const Border = props.border ? "Border" : "";

  return (
    <div className={"Label " + Border}>
      <div className="TextSize">{titleText}</div>
      <Barcode
        value={barcodeValue}
        marginTop={1}
        marginLeft={1}
        marginRight={1}
        format="CODE39"
        height={30}
        // text="*TR00514*"
        width={1}
        fontSize={15}
      />
    </div>
  );
};

export default Label;

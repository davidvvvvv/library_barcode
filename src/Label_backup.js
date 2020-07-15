import React, { useMemo } from "react";
import Barcode from "react-barcode";
import "./styles.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    paddingTop: 1,
    textAlign: "center",
    border: "0.1mm",
    borderStyle: "solid"
  }
});

const LabelWraper = props => {
  const { letter, ...other } = props;
  const classes = useStyles(props);
  return <div className={classes.root} {...other} />;
};

const Label = props => {
  const titleText = props.titleText;
  const barcodeValue = props.barcodeValue;
  const letter = props.letter;

  return (
    <LabelWraper letter={letter}>
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
    </LabelWraper>
  );
};

export default Label;

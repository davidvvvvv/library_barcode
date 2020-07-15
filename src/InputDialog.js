import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback
} from "react";
import { DataContext } from "./DataContext";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Snackbar from "@material-ui/core/Snackbar";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";

const options = ["TR", "C"];

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const InputDialog = props => {
  const [open, setOpen] = useState(false);
  const [dataObject, setDataObject] = useContext(DataContext);
  const [messageOpen, setMessageOpen] = useState(false);
  const [printDisable, setPrintDisable] = useState(true);
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState(0);
  const classes = useStyles();
  const input2Dom = useRef();
  const pageNumDom = useRef();

  document.onkeydown = event => {
    if (event.keyCode === 13) handleClickOpen();
  };

  const handleRadioChange = event => {
    /*
    let tempAns = false;
    if (dataObject.numFrom < 100000 && dataObject.numTo < 100000)
      tempAns = true;
    if (tempAns) {
      setMessageOpen(false);
    } else {
      setMessageOpen(true);
    }*/
    const tempValue = event.target.value;
    setDataObject(prevState => {
      return { ...prevState, letter: tempValue };
    });
  };

  const handleNumFromChange = event => {
    const tempInput = event.target.value;
    if (/^\d+$/.test(tempInput)) {
      setInput1(parseInt(tempInput));

      let isPass = false;
      if (input2 < 100000 && tempInput < 100000) isPass = true;
      if (input2 < tempInput) isPass = false;
      if (input2 - tempInput > 119) isPass = false;

      //console.log("input1", tempInput);
      //console.log("input2", input2);

      if (isPass) {
        setDataObject(prevState => {
          return { ...prevState, numFrom: tempInput, numTo: input2 };
        });
        setMessageOpen(false);
        setPrintDisable(false);
      } else {
        setMessageOpen(true);
        setPrintDisable(true);
      }
      //if (dataObject.numTo < tempNum) setPrintDisable(true);
    } else {
      setMessageOpen(true);
      setPrintDisable(true);
    }
  };

  const handleNumToChange = event => {
    const tempInput = event.target.value;
    if (/^\d+$/.test(tempInput)) {
      setInput2(parseInt(tempInput));

      let isPass = false;
      if (tempInput < 100000 && input1 < 100000) isPass = true;
      if (tempInput < input1) isPass = false;
      if (tempInput - input1 > 119) isPass = false;

      // console.log("input1", input1);
      //console.log("input2", tempInput);

      if (isPass) {
        setDataObject(prevState => {
          return {
            ...dataObject,
            numFrom: input1,
            numTo: tempInput
          };
        });
        setMessageOpen(false);
        setPrintDisable(false);
      } else {
        setMessageOpen(true);
        setPrintDisable(true);
      }
      // if (dataObject.numFrom === 0) setPrintDisable(true);
    } else {
      setMessageOpen(true);
      setPrintDisable(true);
    }
  };

  useEffect(() => {
    handleClickOpen();
  }, []);

  const handleClickOpen = () => {
    resetInput();
    setOpen(true);
    setPrintDisable(true);
  };

  const resetInput = () => {
    setInput1(0);
    setInput2(0);
    //input2Dom.current.value;
    setDataObject(prevState => {
      return { ...prevState, letter: "TR", numTo: 0, numFrom: 0 };
    });
  };

  const handleClose = () => {
    resetInput();
    setMessageOpen(false);
    setOpen(false);
  };

  const borderChange = () => {
    setDataObject(prevState => {
      return { ...prevState, border: !dataObject.border };
    });
  };

  const pageChange = event => {
    input2Dom.current.value = input1 + (event.target.value * 24 - 1);
    setInput2(input2Dom.current);
    setDataObject(prevState => {
      return {
        ...dataObject,
        numFrom: input1,
        numTo: input2Dom.current.value
      };
    });
    setMessageOpen(false);
    setPrintDisable(false);
  };

  const printBarCode = () => {
    const printPromise = new Promise(function(resolve, reject) {
      try {
        setMessageOpen(false);
        setOpen(false);
        resolve();
      } catch (error) {
        const reason = new Error("I dont know why issue error !");
        reject(reason);
      }
    });

    printPromise.then(() => {
      console.log("print");
      window.print();
    });
  };

  return (
    <div>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Barcode Generator</DialogTitle>
        <DialogContent>
          <DialogContentText>請輸入以下資料</DialogContentText>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
          >
            <RadioGroup
              // ref={radioGroupRef}
              aria-label="ringtone"
              name="ringtone"
              value={dataObject.letter}
              onChange={handleRadioChange}
            >
              {options.map(option => (
                <FormControlLabel
                  value={option}
                  key={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>

            <FormControlLabel
              control={
                <Switch
                  checked={dataObject.border}
                  onChange={borderChange}
                  name="switch"
                  color="secondary"
                />
              }
              label="格線"
            />

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="編號由:"
              type="text"
              //value={input1}
              // fullWidth
              onChange={handleNumFromChange}
            />

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="編號至:"
              type="text"
              inputRef={input2Dom}
              //value={input2Dom.current}
              //fullWidth
              onChange={handleNumToChange}
            />
            <FormControl fullWidth>
              <Select
                //value={}
                onChange={pageChange}
                displayEmpty
                className={classes.selectEmpty}
                inputProps={{ "aria-label": "Without label" }}
                ref={pageNumDom}
              >
                <MenuItem value="版數" disabled>
                  版數
                </MenuItem>
                <MenuItem value={1}>1版(24個)</MenuItem>
                <MenuItem value={2}>2版(48個)</MenuItem>
                <MenuItem value={3}>3版(72個)</MenuItem>
                <MenuItem value={4}>4版(96個)</MenuItem>
                <MenuItem value={5}>5版(120個)</MenuItem>
              </Select>
              <FormHelperText>版數</FormHelperText>
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
          <Button
            onClick={printBarCode}
            color="primary"
            disabled={printDisable}
          >
            確定
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={messageOpen}
        autoHideDuration={6000}
        //onClose={messageClose}
        message="只可數字,不可多於5位數,留意編號應由小至大及編號相差不可相差120"
      />
    </div>
  );
};

export default InputDialog;

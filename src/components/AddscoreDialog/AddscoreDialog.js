import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState } from 'react'
import TextField from '@mui/material/TextField';
import './AddscoreDialog.scss'
import Voice from '../Voice/Voice';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function AlertDialogSlide(props) {
  const { personName, round, set } = props;
  const [score, setScore] = useState("");
  const handleClose = () => {
    props.handle(false)
    setScore('')
  };

  const handleAdd = () => {
    if (score === '' || score === 'NaN') {
      alert('Please Add a Value')
    } else {
      props.handle(false)
      set(personName, round, score)
      setScore('')
    }
  }

  const setScoreValue = (e) => {
    if(e.target.value){
      setScore(parseInt(e.target.value))
    } else {
      setScore('')
    }
  }

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="m"
      >
        <DialogTitle> Add Score for {personName}</DialogTitle>
        <DialogContent>
          <div className="scoreTextWrapper">
            <div><DialogContentText id="alert-dialog-slide-description">
              Round {round}
            </DialogContentText></div>
            <div className="flexOne"><Voice set={setScore} /></div>
          </div>
        </DialogContent>
        <div className="scoreTextWrapper">
          <TextField type="number" fullWidth InputProps={{ style: { fontSize: 35 } }} InputLabelProps={{ style: { fontSize: 35 } }} label="Score" variant="outlined" value={score} onChange={(e) => { setScoreValue(e) }} />
        </div>
        <DialogActions>
          <Button onClick={handleAdd}>Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>

      </Dialog>
    </div>
  );
}

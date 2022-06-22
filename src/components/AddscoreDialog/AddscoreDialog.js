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
import Voice from '../Voice';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function AlertDialogSlide(props) {
  const { personName, round, set } = props;
  const [score, setScore] = useState('');
  const handleClose = () => {
    props.handle(false)
    setScore('')
  };

  const handleAdd = () => {
    if (score === '') {
      alert('Please Add a Value')
    } else {
      props.handle(false)
      set(personName, round, score)
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
          <DialogContentText id="alert-dialog-slide-description">
            Round {round}
          </DialogContentText>
        </DialogContent>
        <div className="scoreTextWrapper">
          <TextField autofocus type="number" fullWidth InputProps={{ style: { fontSize: 35 } }} InputLabelProps={{ style: { fontSize: 35 } }} label="Score" variant="outlined" value={score} onChange={(e) => { setScore(parseInt(e.target.value)) }} />
        </div>
        <DialogActions>
          <Button onClick={handleAdd}>Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
        <Voice set={setScore}/>
      </Dialog>
    </div>
  );
}

import React, {Component} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddscoreDialog from '../AddscoreDialog/AddscoreDialog';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Button from '@mui/material/Button';
import './scoreBoard.scss';
class ScoreBoard extends Component {
  state = {
    currentRound: 0,
    currentOpenFor: 0,
    openDialog: false,
    currentPersonForScore: null,
    playersList: [],
    playerScores: {},
    forRound: null
  };
  generateRows = () => {
    const {currentOpenFor, playersList} = this.state;
    let arr = [];
    for (let i = 0; i <= this.state.currentRound; i++) {
      arr.push(
        <TableRow
          key={i}
          sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
          <TableCell key={i} align='center'>
            {i + 1} :{' '}
          </TableCell>
          {playersList.map((player, index) => (
            <TableCell
              key={index + i}
              className={
                i === this.state.currentRound && index === currentOpenFor
                  ? 'currentOpen'
                  : ''
              }
              onClick={() => {
                this.handleDialog(true, playersList[index], i + 1);
              }}
              align='center'
            >
              {this.state.playerScores[player][i] > -1
                ? this.state.playerScores[player][i]
                : '+'}
            </TableCell>
          ))}
        </TableRow>
      );
    }
    return arr;
  };
  completeRound = () => {
    const {currentRound, playerScores} = this.state;
    let isValidated = true;
    for (let x in playerScores) {
      if (playerScores[x][currentRound] === undefined) {
        alert('Please Add Scores for all the Players');
        isValidated = false;
        break;
      }
    }
    if (isValidated) {
      this.setState({
        currentRound: currentRound + 1
      });
    }
  };

  componentDidMount() {
    const {
      data: {names, selected}
    } = this.props;
    let playerList = selected.map(item => names[item]);
    let scoreObject = {};
    playerList.forEach(item => (scoreObject[item] = []));
    this.setState({
      playerScores: scoreObject,
      playersList: playerList
    });

    /////////////////////////////////
  }

  speech = () => {
    // let synth = window.speechSynthesis;
    // let voices = []
    // const populateVoiceList = () => {
    //     voices = synth.getVoices();
    // }
    // populateVoiceList();
    // if (speechSynthesis.onvoiceschanged !== undefined) {
    //     speechSynthesis.onvoiceschanged = populateVoiceList;
    // }
    // let utterThis = new SpeechSynthesisUtterance("hello");
    // utterThis.voice = voices[7]
    // console.log(voices[7])
    // synth.speak(utterThis);
    const {playersList} = this.state;
    let synth = window.speechSynthesis;
    let voices = [];
    const populateVoiceList = () => {
      voices = synth.getVoices();
      let text = '';
      playersList.forEach(item => {
        text += `${item},${this.getTotalScore(item)}.`;
      });
      let utterThis = new SpeechSynthesisUtterance(text);
      let index = 0;
      for (let x in voices) {
        if (voices[x].lang === 'hi-IN') {
          break;
        } else {
          index++;
        }
      }
      console.log(index);
      console.log(voices);
      utterThis.voice = voices[index];
      utterThis.rate = 0.8;
      if (voices.length) {
        synth.speak(utterThis);
      }
    };
    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
    }
  };

  handleDialog = (status, name = null, round = 0) => {
    if (name && status) {
      this.setState({
        openDialog: status,
        currentPersonForScore: name,
        forRound: round
      });
    } else {
      this.setState({
        openDialog: status
      });
    }
  };

  setScore = (personName, round, score) => {
    let copy = {...this.state.playerScores};
    copy[personName][round - 1] = score;
    this.setState({
      playerScores: copy
    });
  };

  getTotalScore = name => {
    const {playerScores} = this.state;
    let counter = 0;
    playerScores[name].forEach(score => {
      counter += score;
    });
    return counter;
  };

  startNewRound = () => {
    let status = window.confirm('Are you sure you want to Reset ?');
    console.log(status);
    if (status) {
      const {
        data: {names, selected}
      } = this.props;
      let playerList = selected.map(item => names[item]);
      let scoreObject = {};
      playerList.forEach(item => (scoreObject[item] = []));
      this.setState({
        playerScores: scoreObject,
        playersList: playerList,
        currentRound: 0,
        currentOpenFor: 0,
        openDialog: false,
        currentPersonForScore: null,
        forRound: null
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentRound !== this.state.currentRound) {
      if (
        this.props.data.selected.length === this.state.currentRound ||
        this.state.currentRound % this.props.data.selected.length === 0
      ) {
        console.log(this.props.data.selected.length);
        console.log(this.state.currentRound);
        this.setState({
          currentOpenFor: 0
        });
      } else {
        console.log(this.props.data.selected.length);
        console.log(this.state.currentRound);
        this.setState({
          currentOpenFor: this.state.currentOpenFor + 1
        });
      }
    }
  }

  render() {
    const {currentRound, playersList, currentPersonForScore, forRound} =
      this.state;
    const {type} = this.props;
    return (
      <div>
        <p className='gameName'>{type === 2 ? 'Best Of 7' : 'Rummy'}</p>
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'></TableCell>
                {playersList.map((name, index) => (
                  <TableCell key={index + name} align='center'>
                    {name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.generateRows(playersList)}
              <TableRow>
                <TableCell align='center'>Total</TableCell>
                {playersList.map((name, index) => (
                  <TableCell key={index + name} align='center'>
                    {this.getTotalScore(name)}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div className='completeButton'>
          <div className='buttonsWrapper'>
            {/* {currentRound < 6 && <Button className='MediumButton submitButton' variant="contained" color="secondary" size="large" endIcon={<NavigateNextIcon />} onClick={this.completeRound}>Complete Round {currentRound + 1}</Button>} */}
            {type === 2 ? (
              currentRound < 6 && (
                <Button
                  className='MediumButton submitButton'
                  variant='contained'
                  color='secondary'
                  size='large'
                  endIcon={<NavigateNextIcon />}
                  onClick={this.completeRound}
                >
                  Complete Round {currentRound + 1}
                </Button>
              )
            ) : (
              <Button
                className='MediumButton submitButton'
                variant='contained'
                color='secondary'
                size='large'
                endIcon={<NavigateNextIcon />}
                onClick={this.completeRound}
              >
                Complete Round {currentRound + 1}
              </Button>
            )}
            <Button
              className='MediumButton clearAll'
              variant='contained'
              color='primary'
              size='large'
              endIcon={<NavigateNextIcon />}
              onClick={this.startNewRound}
            >
              Start New Round
            </Button>
          </div>
          <Button
            className='MediumButton listen'
            variant='contained'
            color='primary'
            size='large'
            endIcon={<NavigateNextIcon />}
            onClick={this.speech}
          >
            Listen
          </Button>
        </div>
        <AddscoreDialog
          round={forRound}
          personName={currentPersonForScore}
          open={this.state.openDialog}
          handle={this.handleDialog}
          set={this.setScore}
        />
      </div>
    );
  }
}

export default ScoreBoard;

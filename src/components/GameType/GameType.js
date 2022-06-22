import React, { Component } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Button from '@mui/material/Button';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import './GameType.scss'
class GameType extends Component {
    navigateBack = () => {
        console.log(this.props);
        this.props.navigate(1)
    }

    setGameType = (type) => {
        this.props.setType(parseInt(type.target.value))
    }

    handleProceed = () => {
        this.props.navigate(3)
    }
    render() {
        const { players, type } = this.props
        return (
            <div className='gameType'>
                <h1>Number of Players : {players}</h1>
                {/* <div>
                    <label><input type='radio' name='gameType' onClick={() => this.setGameType(1)} />Rummy</label>
                </div>
                <div>
                    <label><input type='radio' name='gameType' onClick={() => this.setGameType(2)} />Best Of 7</label>
                </div> */}
                <div className="radioWrapper">
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={type}
                            onChange={this.setGameType}
                        >
                            <FormControlLabel value={1} control={<Radio />} label={<span>Rummy</span>} />
                            <FormControlLabel value={2} control={<Radio />} label={<span>Best Of 7</span>} />
                        </RadioGroup>
                    </FormControl>
                </div>
                {/* <button onClick={this.navigateBack}>GameType back</button> */}
                <Button className='LargeButton goBack' variant="contained" color="secondary" size="large" startIcon={<NavigateNextIcon />} onClick={this.navigateBack}>Go Back</Button>
                <div> {type && <Button className='LargeButton submitButton' variant="contained" color="primary" size="large" endIcon={<NavigateNextIcon />} onClick={this.handleProceed}>Proceed</Button>}</div></div>
        );
    }
}

export default GameType;
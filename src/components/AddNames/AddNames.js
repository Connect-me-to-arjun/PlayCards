import React, { Component } from 'react';
import GameType from '../GameType/GameType';
import Play from '../Play/Play';
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TextField from '@mui/material/TextField';
import './AddNames.scss'




///////////////////



import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

 

class AddNames extends Component {
    state = {
        names: ['Arjun', 'Susheela', 'Tinku', 'Prasad', 'Punna', 'Chumma', 'Ammi', 'Amulu'],
        addMoreValue: '',
        selected: [],
        selectedPage: 1,
        gameType: undefined
    }
    handleAddMore = (e) => {
        this.setState({
            addMoreValue: e.target.value
        })
    }

    handleNavigation = (pageNo) => {
        this.setState({
            selectedPage: pageNo
        })
    }

    handleSelectPlayers = (index) => {
        if (this.state.selected.indexOf(index) > -1) {
            let newList = [...this.state.selected];
            const newIndex = newList.indexOf(index);
            newList.splice(newIndex, 1)
            console.log(newList)
            this.setState({
                selected: newList
            })
        } else {
            this.setState({
                selected: [...this.state.selected, index]
            })
        }
    }

    checkDuplicates = () => {
        let status = false;
        const nameList = this.state.names.map((name) => name.toUpperCase());
        if (nameList.indexOf(this.state.addMoreValue.toUpperCase()) > -1) {
            status = true
        }
        return status;
    }

    handleSubmit = () => {
        const { addMoreValue } = this.state;
        if (!addMoreValue.length) {
            alert('please enter a name')
        } else {
            if (this.checkDuplicates()) {
                alert('name already present')
            }
            else {
                this.setState({
                    names: [...this.state.names, this.state.addMoreValue],
                    addMoreValue: ''
                })
            }
        }

    }
    handleClear = () => {
        this.setState({
            selected: []
        })
    }

    proceed = () => {
        this.setState({
            selectedPage: 2
        })
    }

    pageOne = () => {
        const { names, addMoreValue, selected } = this.state;
        let nameList = names.sort();
        return (
            <div className='addNames'> 
                <h1 className='selectNames' style={{textAlign:'center'}}>Select Names</h1> 
                {/* <div>
                    {nameList.map((name, index) => <div> <p className={this.state.selected.indexOf(index) > -1 && 'selected'} onClick={() => this.handleSelectPlayers(index)}>{name} {this.state.selected.indexOf(index) > -1 && <span>Player {this.state.selected.indexOf(index) + 1}</span>}</p></div>)}
                </div> */}
                <TableContainer className='tableList'>
                    <Table size="large">
                        <TableHead>

                        </TableHead>
                        <TableBody>
                            {nameList.map((name, index) => (
                                <TableRow
                                    key={name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell onClick={() => this.handleSelectPlayers(index)} component="th" scope="name" className={`tableNames ${this.state.selected.indexOf(index) > -1 && 'selected'}`} >
                                        {name} {this.state.selected.indexOf(index) > -1 && <span>Player : {this.state.selected.indexOf(index) + 1}</span>}
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div >
                    {/* <div className='selectedMeta'>Selected : {selected.length} Players</div> */}
                    {/* <span>Add More : </span> */}
                    {/* <input type='text' value={addMoreValue} onChange={this.handleAddMore} /> */}
                    <TextField InputProps={{ style: { fontSize: 35 } }} InputLabelProps={{ style: { fontSize: 35 } }} fullWidth label="Add More" variant="outlined" value={addMoreValue} onChange={this.handleAddMore} />
                    <div className='buttonsWrapper'>
                        <Button className='LargeButton submitButton' variant="contained" color="primary" size="large" endIcon={<NavigateNextIcon />} onClick={this.handleSubmit} >Submit</Button>
                        <Button className='LargeButton clearAll' variant="contained" color="secondary" size="large" endIcon={<NavigateNextIcon />} onClick={this.handleClear}>Clear All</Button>
                    </div>
                    {/* <button onClick={() => console.log(this.state)}>show</button> */}
                </div>
                {selected.length > 1 && <Button className='LargeButton proceedPlayers' variant="contained" color="success" size="large" endIcon={<NavigateNextIcon />} onClick={this.proceed}>
                    Proceed with {selected.length} players
                </Button>}
            </div>
        );
    }


    setRoute = () => {
        switch (this.state.selectedPage) {
            case 1: return this.pageOne();
            case 2: return <GameType navigate={this.handleNavigation} players={this.state.selected.length} setType={this.setGameType} type={this.state.gameType} />;
            case 3: return <Play type={this.state.gameType} navigate={this.handleNavigation} data={this.state} />
            default: return <h1>No Page Error</h1>
        }
    }

    setGameType = (type) => {
        this.setState({
            gameType: type
        })
    }

    componentDidMount(){
  

    }

    render() {
        return this.setRoute()
    }
}

export default AddNames;
import React from 'react';
import Rummy from '../Rummy/Rummy';
import BestOfSeven from '../BestOfSeven/BestOfSeven';
const Play = (props) => {
    return (
        <div>
            <h1 style={{textAlign:'center'}}>Good Luck</h1>
            {props.type===1 ?<Rummy {...props}/> : <BestOfSeven {...props}/>}
        </div>
    );
};

export default Play;
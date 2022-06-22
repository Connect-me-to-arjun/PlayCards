import React from 'react';
import BestOfSeven from '../scoreBoard/scoreBoard';
const Play = (props) => {
    return (
        <div>
            <h1 style={{textAlign:'center'}}>Good Luck</h1>
            {props.type===1 ?<BestOfSeven {...props}/> : <BestOfSeven {...props}/>}
        </div>
    );
};

export default Play;
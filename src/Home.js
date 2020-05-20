import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDice,faRobot} from '@fortawesome/free-solid-svg-icons';


export default class Home extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='card board mx-auto mt-5' id='mainCard'>
                <div className="card-header">
                    Welcome to tic toc game
                </div>
                <div className="card-body">
                    <h5 className="card-title">Tic toc Game made by Sami Abishai</h5>
                    <p className="card-text">To start the game press the start button below and enjoy</p>
                    <Link className="btn btn-dark text-white m-1" id='startGame' to="/TicTacToeReactGame/game/"><FontAwesomeIcon icon={faDice} />  Start The Game 1 vs 1</Link>
                </div>
            </div>
        );
    }
}
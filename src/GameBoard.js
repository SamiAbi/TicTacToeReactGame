import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const winMoves = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];


export default class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerTurn: 'X',
            xMoves: [],
            oMoves: [],
            status: 'X Turn',
            statusClass: '',
            nextRound: 'collapse',
            board: [[{ num: 1, status: '', className: 'xoBox' }, { num: 2, status: '', className: 'xoBox' }, { num: 3, status: '', className: 'xoBox' }],
            [{ num: 4, status: '', className: 'xoBox' }, { num: 5, status: '', className: 'xoBox' }, { num: 6, status: '', className: 'xoBox' }],
            [{ num: 7, status: '', className: 'xoBox' }, { num: 8, status: '', className: 'xoBox' }, { num: 9, status: '', className: 'xoBox' }]]
        }
        this.setXO = this.setXO.bind(this);
        this.checkIfSomeoneWin = this.checkIfSomeoneWin.bind(this);
        this.CheckIfArrayInclude = this.CheckIfArrayInclude.bind(this);
        this.endGame = this.endGame.bind(this);
        this.restartGame = this.restartGame.bind(this);
    }
    CheckIfArrayInclude(array, check) {
        for (var i = 0; i < array.length; i++) {
            if (!check.includes(array[i])) {
                return false;
            }
        }
        return true;
    }
    checkIfSomeoneWin() {
        console.log('X:' + this.state.xMoves + '\nO:' + this.state.oMoves);
        for (var i = 0; i < winMoves.length; i++) {
            if (this.CheckIfArrayInclude(winMoves[i], this.state.xMoves) || this.CheckIfArrayInclude(winMoves[i], this.state.oMoves)) {
                var newBoard = this.state.board;
                newBoard.forEach((row) => row.forEach((cell) => {
                    if (winMoves[i].includes(cell.num)) {
                        cell.className += ' xoBoxWin';
                    }
                }));
                return newBoard;
            }
        }
        return false;
    }

    setXO(i, j) {
        const boxNum = i * 3 + j + 1;
        var newBoard = this.state.board, turn, status, xMoves, oMoves;
        newBoard[i][j].status = this.state.playerTurn;
        newBoard[i][j].className = this.state.playerTurn + 'BoxSelected';
        if (this.state.playerTurn == 'X') {
            turn = 'O';
            status = 'O Turn';
            xMoves = [...this.state.xMoves, boxNum];
            oMoves = this.state.oMoves;
        }
        else {
            turn = 'X';
            status = 'X Turn';
            oMoves = [...this.state.oMoves, boxNum];
            xMoves = this.state.xMoves;
        }
        this.setState({ oMoves: oMoves, xMoves: xMoves, playerTurn: turn, status: status, board: newBoard });


    }
    endGame(status, newBoard) {
        this.setState({ status: status, statusClass: 'xoBoxWin', nextRound: '', board: !!newBoard ? newBoard : this.state.board });
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.status.indexOf('Turn') > -1) {
            var status, newBoard = this.checkIfSomeoneWin();
            if (newBoard) {
                if (this.state.playerTurn == 'X') {
                    status = 'O Win'

                }
                else {
                    status = 'X Win';

                }
                this.endGame(status, newBoard);
                //
                //checkIfLastRoundAndUpdate();
            }
            else if (this.state.xMoves.length == 5) {
                this.endGame('Draw');

            }
        }
    }
    restartGame() {
        this.setState({
            playerTurn: 'X',
            xMoves: [],
            oMoves: [],
            status: 'X Turn',
            statusClass: '',
            nextRound: 'collapse',
            board: [[{ num: 1, status: '', className: 'xoBox' }, { num: 2, status: '', className: 'xoBox' }, { num: 3, status: '', className: 'xoBox' }],
            [{ num: 4, status: '', className: 'xoBox' }, { num: 5, status: '', className: 'xoBox' }, { num: 6, status: '', className: 'xoBox' }],
            [{ num: 7, status: '', className: 'xoBox' }, { num: 8, status: '', className: 'xoBox' }, { num: 9, status: '', className: 'xoBox' }]]
        });
    }

    render() {
        return (
            <div className='container text-center mt-5 bg-dark' id='boardGame'>
                <div className={`row text-white ${this.state.statusClass}`}>
                    <h3 className={"mx-auto mt-3" + ` ${this.state.statusClass}`} id="status">{this.state.status}</h3>
                    <button id="nextRound" type="button" className={this.state.nextRound + " btn btn-light m-1 float-right"} onClick={this.restartGame}>
                        <FontAwesomeIcon icon={faArrowRight} /> Restart</button>
                </div>
                {
                    this.state.board.map((row, i) => {
                        return <div className="row"> {
                            row.map((val, j) => <div key={val.num} className={`col ${val.className}`} value={val.num} onClick={() => this.state.status.indexOf("Turn") > -1 && val.status == '' && this.setXO(i, j)}>{val.status}</div>)
                        }</div>
                    })
                }
            </div>
        );
    }
}
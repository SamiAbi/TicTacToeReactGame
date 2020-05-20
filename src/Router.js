import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from './Header'
import Home from './Home'
import GameBoard from './GameBoard';
export default () => (
    <BrowserRouter>
        <div>
            <Header />
            <div className="mx-1 pb-5">
                {<Switch>
                    <Route path="/TicTacToeReactGame/" component={Home} exact />
                    <Route path="/TicTacToeReactGame/game/" component={GameBoard} />
                </Switch>}
            </div>
        </div>
    </BrowserRouter>
);
import React from "react";
import { Link } from "react-router-dom";



export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.navbarMenu = [
            {
                path: '/',
                id: 'Home',
                name: 'Home'
            },
            {
                path: '/game/',
                id: 'newGame',
                name: 'New Game 1 vs 1'
            },
        ];
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">X/O Tic Toc Game</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <ul className="navbar-nav mr-auto">
                    {
                        (() => {
                            return this.navbarMenu.map((menuItem, index) => {
                                return <li className="nav-item active" key={index}>
                                    <Link className="nav-link" to={menuItem.path}>
                                        {menuItem.name}
                                    </Link>
                                </li>

                            })
                        })()
                    }
                </ul>
            </nav>
        );
    }
}
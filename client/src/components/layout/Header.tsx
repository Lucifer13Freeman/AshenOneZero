import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../actions/auth';


const Header = ({ logout, auth: { is_authenticated, user }}:any) =>
{
    const on_logout = (e:any) => 
    {
        e.preventDefault();
        logout();
    }

    let links;

    if (is_authenticated) links = (

        <li className="nav-item dropdown">
            <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                id="navbarDropdown" 
                role="button" 
                data-toggle="dropdown" 
                aria-haspopup="true" 
                aria-expanded="false"
            >
                <i className="fa fa-user"></i>
                Account
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to={'/user/' + user.id}>My Profile</Link>
                <div className="dropdown-divider"></div>
                <a
                    className="dropdown-item"
                    href="#"
                    onClick={on_logout}
                    >Log Out
                </a>
            </div>
        </li>
    );
    else links = (

        <React.Fragment>
            <li className="nav-item">
                <Link className="nav-link" to="/login">
                    <i className="fa fa-sign-in"></i>
                    Log In
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register">
                  <i className="fa fa-user-plus"></i>
                  Register
                </Link>
            </li>
        </React.Fragment>
    );

    return(

        <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">AshenOne</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <i className="fa fa-globe"></i>
                                All Posts
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/feed">
                                <i className="fa fa-rss"></i>
                                Feed
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {links}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

/*class Header extends React.Component<any, any>
{
    on_logout = (e:any) => {
        e.preventDefault();
        this.props.logout();
    }

    render()
    {
        const { is_authenticated, user } = this.props.auth;

        let links;
        if (is_authenticated) links = (

            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-user"></i>
                    Account
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to={'/user/' + user.id}>My Profile</Link>
                    <div className="dropdown-divider"></div>
                    <a
                        className="dropdown-item"
                        href="#"
                        onClick={this.on_logout}
                        >Log Out
                    </a>
                </div>
            </li>
        );
        else links = (

            <React.Fragment>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        <i className="fa fa-sign-in"></i>
                        Log In
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      <i className="fa fa-user-plus"></i>
                      Register
                    </Link>
                </li>
            </React.Fragment>
        );

        return(
            <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">AshenOne</Link>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#navbarSupportedContent" 
                        aria-controls="navbarSupportedContent" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    <i className="fa fa-globe"></i>
                                    All Posts
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/feed">
                                    <i className="fa fa-rss"></i>
                                    Feed
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            {links}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

    static propTypes: 
    {
        logout: PropTypes.Validator<(...args: any[]) => any>;
        auth: PropTypes.Validator<object>;
    }
}*/


Header.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const map_state_to_props = (state:any) => ({ auth: state.auth });

export default connect(map_state_to_props, { logout })(Header);
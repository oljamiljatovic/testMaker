import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import 'normalize.css/normalize.css';


export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeLink: this.props.activeLink
        };
    }

    defaultProps = {
        title: 'Generator testova',
        subtitle: 'Pomoć u formiranju testova'
    };


    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="navbar-background  col-sm-2 "> </div>

                    <div className="col-sm-10 ">
                        <div className="row">
                            <div className=" offset-sm-6 col-sm-6">
                                <nav className="navbar navbar-icon-top navbar-expand-lg navbar-light " style={{float:"right"}}>
                                    <a className="navbar-brand" href="#"></a>
                                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav mr-auto">
                                            <li className={this.state.activeLink === '/' ? 'nav-item active' : 'nav-item'} >
                                                <Link to="/" className="nav-link"  >  <i className="fa fa-home color-icon" ></i>
                                                Početna </Link>
                                            </li>
                                            <li className={this.state.activeLink === 'createTest' ? 'nav-item active' : 'nav-item'}>
                                                <Link to="/createTest" className="nav-link"  ><i className="fa fa-file-text-o color-icon"> </i>
                                                Kreiraj test </Link>
                                            </li>
                                            <li className={this.state.activeLink === 'importFile' ? 'nav-item active' : 'nav-item'}>
                                                <Link to="/importFile" className="nav-link" > <i className="fa fa-upload color-icon"> </i>
                                                Učitaj fajl </Link>
                                            </li>
                                            <li className={this.state.activeLink === 'testList' ? 'nav-item active' : 'nav-item'}>
                                                <Link to="/testList" className="nav-link " > <i className="fa fa-files-o color-icon" />
                                                    Gotovi testovi </Link>
                                            </li>
                                            <li className={this.state.activeLink === 'addSubject' ? 'nav-item active' : 'nav-item'}>
                                                <Link to="/addSubject" className="nav-link " > <i className="fa fa-files-o color-icon" />
                                                    Dodaj predmet </Link>
                                            </li>

                                        </ul>
                                    </div>

                                </nav>
                            </div>
                        </div>
                        <div className="row">
                            <div className="header-title  text-center title-font2 offset-lg-3">
                                <h1 className="title-font color-icon">{this.defaultProps.title} </h1>
                                <p className="subtitle-font color-light-icon">{this.defaultProps.subtitle} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



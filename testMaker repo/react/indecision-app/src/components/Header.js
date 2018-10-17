import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import 'normalize.css/normalize.css';


export default class Header extends React.Component {
    constructor(props) {
        super(props);
        // this.changeActive = this.changeActive.bind(this);
        this.state = {
            activeLink: this.props.activeLink
        };
    }

    defaultProps = {
        title: 'Generator testova',
        subtitle: 'Pomoć u formiranju testova'
    };

    /*   componentDidMount() {
         console.log(this.props.activeLink)
  
        } */



    render() {
        return (
            <div  className = "border-bottom" >{/* className = "border-bottom" */}
            <div className="container">
                <div className="row row-header">
                    <div className="navbar-background  col-lg-2 "> </div>

                    <div className="col-lg-10 ">
                        <div className="row padding-right-header">
                            <div className = " offset-lg-7 col-lg-5 ">
                                <nav className="navbar navbar-icon-top navbar-expand-lg navbar-light ">{/*   navbar-color-red */}
                                    <a className="navbar-brand" href="#"></a>
                                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav mr-auto">
                                            <li className={this.state.activeLink === '/' ? 'nav-item active' : 'nav-item'} >
                                                {/*   <li className="nav-item active"> */}
                                                <Link to="/" className="nav-link"  >  <i className="fa fa-home color-icon" ></i>Početna </Link>

                                            </li>

                                            <li className={this.state.activeLink === 'createTest' ? 'nav-item active' : 'nav-item'}>
                                                <Link to="/createTest" className="nav-link"  ><i className="fa fa-file-text-o color-icon"> </i>Kreiraj test </Link>
                                            </li>
                                            <li className={this.state.activeLink === 'importFile' ? 'nav-item active' : 'nav-item'}>
                                                <Link to="/importFile" className="nav-link" > <i className="fa fa-upload color-icon">

                                                </i>Učitaj fajl </Link>

                                            </li>
                                            <li className={this.state.activeLink === 'testList' ? 'nav-item active' : 'nav-item'}>
                                                <Link to="/testList" className="nav-link " > <i className="fa fa-files-o color-icon" /> Gotovi testovi </Link>
                                            </li>
                                        </ul>
                                    </div>

                                </nav>
                            </div>               
                             </div>
                      <div className = "row">
                        <div className="header-title  text-center title-font2 offset-lg-3">
                            <h1 className="title-font color-icon">{this.defaultProps.title} </h1>
                            <p className = "subtitle-font color-light-icon">{this.defaultProps.subtitle} </p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
           {/*  <div className="slope leftslope"></div>
            <div className="slope rightslope"></div> */}
            </div>
        );
    }
}



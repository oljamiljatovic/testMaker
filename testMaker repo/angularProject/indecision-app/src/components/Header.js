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
        title: 'Test maker',
        subtitle: 'Pomoc u formiranju testova'
    };

  /*   componentDidMount() {
       console.log(this.props.activeLink)

      } */

  

    render() {
        return (
            <div className="navbar-background" >


                <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark navbar-padding">{/*   navbar-color-red */}
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className={this.state.activeLink === '/' ? 'nav-item active' : 'nav-item'} >
                                {/*   <li className="nav-item active"> */}
                                <Link to="/" className="nav-link"  >  <i className="fa fa-home"></i>Home </Link>
             
                            </li>

                            <li className={this.state.activeLink === 'createTest' ? 'nav-item active' : 'nav-item'}>
                                <Link to="/createTest" className="nav-link"  ><i className="fa fa-file-text-o"> </i>Kreiraj test </Link>
                            </li>
                            <li className={this.state.activeLink === 'importFile' ? 'nav-item active' : 'nav-item'}>
                                <Link to="/importFile" className="nav-link" > <i className="fa fa-upload">

                                </i>Ucitaj fajl </Link>

                            </li>
                            <li className={this.state.activeLink === 'testList' ? 'nav-item active' : 'nav-item'}>
                                <Link to="/testList" className="nav-link " > <i className="fa fa-files-o" /> Gotovi testovi </Link>
                            </li>


                        </ul>

                        {/* <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form> */}
                    </div>

                </nav>
                <div className="header-title  text-center">
                    <h1>{this.defaultProps.title} </h1>
                    <p>{this.defaultProps.subtitle} </p>
                </div>
            </div>
        );
    }
}



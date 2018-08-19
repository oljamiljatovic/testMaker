import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import 'normalize.css/normalize.css';


export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    defaultProps = {
        title: 'Test maker',
        subtitle: 'Pomoc u formiranju testova'
    };



    render() {
        return (
            <div  className = "navbar-background" >
            
                {/*      <div> 
             {this.defaultProps.subtitle && <h2>{this.defaultProps.subtitle} </h2>}
 
             <Link to = "/">Home</Link>
             <Link to = "/createTest">Kreiranje novog testa </Link>
             <Link to = "/importFile">Ucitavanje pitanja </Link>
             <Link to = "/testList">Gotovi testovi </Link>
             </div> */}
                <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark navbar-padding">{/*   navbar-color-red */}
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to = "/" className="nav-link">  <i className="fa fa-home"></i>Home<span className="sr-only">(current)</span> </Link>
                            </li>
                           
                            <li className="nav-item">
                                 <Link to = "/createTest" className="nav-link" ><i className="fa fa-file-text-o"> </i>Kreiraj test {/* <span className="badge badge-danger">11</span> */} </Link>
                            </li>
                            <li className="nav-item">
                                <Link to = "/importFile" className="nav-link "> <i className="fa fa-upload">
                                 {/*        <span className="badge badge-danger">11</span> */}
                                    </i>Ucitaj fajl </Link>
                             
                            </li>
                            <li>
                              <Link to = "/testList" className="nav-link "> <i className="fa fa-files-o" /> Gotovi testovi </Link>
                            </li>
                           

                        </ul>

                        {/* <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form> */}
                    </div>

                </nav>
               <div className ="header-title  text-center"> 
                   <h1>{this.defaultProps.title} </h1>
                   <p>{this.defaultProps.subtitle} </p>
             </div>
            </div>
        );
    }
}



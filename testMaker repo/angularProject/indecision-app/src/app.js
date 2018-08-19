import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import {BrowserRouter, Route, Switch,Link} from 'react-router-dom';
import SubjectList from './components/SubjectList';
import Header from './components/Header';
import CreateTest from './components/CreateTest';
import ImportFile from './components/ImportFile';
import TestList from './components/TestList';
import validator from 'validator';
import SectionList from './components/SectionList';
//import 'bootstrap/dist/css/bootstrap.min.css';


const Dashbord = () => (
<div><Header /> <br/> <SubjectList canAddSubjectShow = {true} /></div>
);

const NotFoundPage = () => (
    <div> Not found!
        <Link to = "/"> Go home</Link> 
    </div>
);

const routes = (
    <BrowserRouter>
        <Switch>
             <Route path = "/" component = {Dashbord} exact = {true}/>
             <Route path = "/createTest" component = {CreateTest} exact = {true}/>
             <Route path = "/importFile" component = {ImportFile} exact = {true}/>
             <Route path = "/testList" component = {TestList} exact = {true}/>
             <Route path = "/sectionList" component = {SectionList} exact = {true}/>
             <Route component = {NotFoundPage} />
        </Switch>
    </BrowserRouter>
);

 ReactDOM.render(routes,document.getElementById('app')); 

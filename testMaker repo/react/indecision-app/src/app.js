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
import MyStatefulEditor from './components/MyStatefulEditor';


const Dashbord = () => (
<div><Header activeLink = "/" /> <br/> <SubjectList canAddSubjectShow = {true} /></div>
);

const NotFoundPage = () => (
    <div> Not found!
        <Link to = "/"> Go home</Link> 
    </div>
);

const routes = (
    <BrowserRouter>
        <Switch>
             <Route path = "/"  render={() => <Dashbord activeLink = "/"/>} exact = {true}/>
             <Route path = "/createTest" render={() => <CreateTest activeLink = "createTest"/>} exact = {true}/>
             <Route path = "/importFile" render={() => <ImportFile activeLink = "importFile"/>} exact = {true}/>
             <Route path = "/testList" render={() => <TestList activeLink = "testList"/>} exact = {true}/>
             <Route path = "/editor" render={() => <MyStatefulEditor activeLink = "editor"/>} exact = {true}/>
    
             <Route component = {NotFoundPage} />
        </Switch>
    </BrowserRouter>
);



 ReactDOM.render(routes,document.getElementById('app')); 

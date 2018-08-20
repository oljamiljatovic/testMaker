import React from 'react';
import Header from './Header';
import SubjectList from './SubjectList';
import { Route, BrowserRouter } from 'react-router';
import { DH_NOT_SUITABLE_GENERATOR } from 'constants';

export default class CreateTest extends React.Component {

  constructor(props) {
    super(props);
    this.getQuestions = this.getQuestions.bind(this);
    this.choosenSubject = this.choosenSubject.bind(this);
    this.addTest = this.addTest.bind(this);
    this.state = {
      questionList: [],
      subjectId: ''
    };
  }


  getQuestions(questions) {
    this.setState({ questionList: questions })
    console.log("hej");
  }


  addTest(e) {
    e.preventDefault();
    console.log("hej");
    let test = {};
    test = {
      name: e.target.elements.name.value,
      questionList: this.state.questionList,
      label: e.target.elements.label.value,
      groupTag: e.target.elements.group.value,
      materials: e.target.elements.materials.value,
      skal: e.target.elements.skal.value == "" ? 1 : e.target.elements.skal.value,
      negod: e.target.elements.negod.value == "" ? 1 : e.target.elements.negod.value,
      poz: e.target.elements.poz.value == "" ? 1 : e.target.elements.poz.value,
      neg: e.target.elements.neg.value == "" ? -1 : e.target.elements.neg.value,
      ispt: e.target.elements.ispt.value == "" ? 0 : e.target.elements.ispt.value,
      edit: e.target.elements.edit.value == "" ? 0 : e.target.elements.edit.value,
      srand: e.target.elements.srand.value == "" ? 0 : e.target.elements.srand.value,
      sviodg: e.target.elements.sviodg.value == "" ? 1 : e.target.elements.sviodg.value,
      testp: e.target.elements.testp.value == "" ? 0 : e.target.elements.testp.value,
      detalji: e.target.elements.detalji.value == "" ? 1 : e.target.elements.detalji.value,
    }


    const url = 'http://localhost:8080/addTest/' + this.state.subjectId;
    let fetchData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      response: true,
      body: JSON.stringify(test)
    }
    fetch(url, fetchData)
      .then(res => res.json())
      .then(data => this.props.history.push('/testList'));

  }

  choosenSubject(subjectId) {
    this.setState({ subjectId: subjectId })
  }
  render() {
    return (

      <div>
        <Header activeLink = "createTest"/>
        <form onSubmit={this.addTest}>
          <div className="row">

            <div className="col-lg-6 form-group  ">
              <div className="row ">
                <div className="offset-lg-1 col-lg-4 offset-lg-1 form-group">
                  <label>Naziv testa*</label>
                  <input className="form-control" type="text" name="name" />
                </div>
                <div className="offset-lg-1 col-lg-4 offset-lg-1 form-group">
                  <label>Oznaka testa*</label>
                  <input className="form-control" type="text" name="label" />
                </div>
              </div>
            </div>

            <div className="col-lg-6 form-group  ">
              <div className="row">
                <div className="offset-lg-1 col-lg-4 offset-lg-1 form-group">
                  <label>Grupa*</label>
                  <input className="form-control" type="text" name="group" />
                </div>
                <div className="offset-lg-1 col-lg-4  offset-lg-1 form-group">
                  <label>Materijali</label>
                  <input className="form-control" type="text" name="materials" />
                </div>
              </div>
            </div>
          </div>

          <div className="row padding-left-test">
            <div className=" col-lg-2 form-group">
              <label>SKAL</label>
              <input className="form-control" type="text" name="skal" placeholder="1" />
            </div>
            <div className="col-lg-2 form-group">
              <label>NEGOD</label>
              <input className="form-control" type="text" name="negod" placeholder="1" />
            </div>
            <div className="col-lg-2 form-group">
              <label>POZ</label>
              <input className="form-control" type="text" name="poz" placeholder="1" />
            </div>
            <div className="col-lg-2 form-group">
              <label>NEG</label>
              <input className="form-control" type="text" name="neg" placeholder="-1" />
            </div>
            <div className="col-lg-2 form-group">
              <label>ISPT</label>
              <input className="form-control" type="text" name="ispt" placeholder="0" />
            </div>
          </div>

          <div className="row padding-left-test">
            <div className=" col-lg-2 form-group">
              <label>EDIT</label>
              <input className="form-control" type="text" name="edit" placeholder="0" />
            </div>
            <div className="col-lg-2 form-group">
              <label>SRAND</label>
              <input className="form-control" type="text" name="srand" placeholder="0" />
            </div>
            <div className="col-lg-2 form-group">
              <label>SVIODG</label>
              <input className="form-control" type="text" name="sviodg" placeholder="1" />
            </div>
            <div className="col-lg-2 form-group">
              <label>TESTP</label>
              <input className="form-control" type="text" name="testp" placeholder="0" />
            </div>
            <div className="col-lg-2 form-group">
              <label>DETALJI</label>
              <input className="form-control" type="text" name="detalji" placeholder="1" />
            </div>
          </div>



          <div className="row">

            <div className=" col-lg-12">
              <SubjectList canAddSubjectShow={false} choosenSubject={this.choosenSubject} isCreateTest={true} getQuestions={this.getQuestions} />

            </div>

          </div>
        
        <div className = "offset-lg-4 col-lg-4  offset-lg-4 form-padding">
                <button  className = "btn btn-primary btn-lg btn-block" onClick={(e) => {
                    this.createTest();
                }} >Dodaj test </button>
                </div>

         {/*  <button>Dodaj test</button> */}
        </form>
      </div>



    );
  }
}
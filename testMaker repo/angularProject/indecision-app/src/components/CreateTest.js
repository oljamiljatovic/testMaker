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
  }


  addTest(e) {
    e.preventDefault();
    let test = {};    
    test = {
      name: e.target.elements.name.value,
      questionList: this.state.questionList,
      label: e.target.elements.label.value,
      groupTag: e.target.elements.group.value,
      materials : e.target.elements.materials.value,
      skal: e.target.elements.skal.value == ""? 1 : e.target.elements.skal.value,
      negod : e.target.elements.negod.value == ""? 1 : e.target.elements.negod.value,
      poz : e.target.elements.poz.value == ""? 1 : e.target.elements.poz.value,
      neg: e.target.elements.neg.value == ""? -1 : e.target.elements.neg.value,
      ispt:e.target.elements.ispt.value == ""? 0 :e.target.elements.ispt.value,
      edit:e.target.elements.edit.value == ""? 0 :e.target.elements.edit.value,
      srand:e.target.elements.srand.value == ""? 0:e.target.elements.srand.value,
      sviodg:e.target.elements.sviodg.value == ""? 1:e.target.elements.sviodg.value,
      testp:e.target.elements.testp.value == ""? 0:e.target.elements.testp.value,
      detalji:e.target.elements.detalji.value == ""? 1:e.target.elements.detalji.value,
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
        <Header />

        <p>Odaberite predmet za koji se kreira test </p>
        <SubjectList canAddSubjectShow={false} choosenSubject={this.choosenSubject} isCreateTest={true} getQuestions={this.getQuestions} />

        <div>
          <p>Naziv testa </p>
          <form onSubmit={this.addTest}>
            <p>Naziv testa :</p>
            <input type="text" name="name" /><br />
            <p>Oznaka testa :</p>
            <input type="text" name="label" /><br />
            <p>Grupa :</p>
            <input type="text" name="group" /><br />
            <p>Materijali :</p>
            <input type="text" name="materials" /><br />
            <label>SKAL :</label>
            <input type="text" name="skal" placeholder = "1" />
            <label>NEGOD :</label>
            <input type="text" name="negod" placeholder = "1" />
            <label>POZ :</label>
            <input type="text" name="poz" placeholder = "1" /><br />
            <label>NEG :</label>
            <input type="text" name="neg" placeholder = "-1" />
            <label>ISPT :</label>
            <input type="text" name="ispt" placeholder = "0" />
            <label>EDIT :</label><br />
            <input type="text" name="edit" placeholder = "0" />
            <label>SRAND :</label>
            <input type="text" name="srand" placeholder = "0"/>
            <label>SVIODG :</label>
            <input type="text" name="sviodg" placeholder = "1"/>
            <label>TESTP :</label>
            <input type="text" name="testp" placeholder = "0"/>
            <label>DETALJI :</label>
            <input type="text" name="detalji" placeholder = "1" />

            <button>Dodaj test</button>
          </form>
        </div>
      </div>

    );
  }
}
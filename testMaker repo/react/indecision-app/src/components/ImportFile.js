import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import QuestionInformation from './QuestionInformation';

export default class ImportFile extends React.Component {

  constructor(props) {
    super(props);
    //this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.schedulesInSections = this.schedulesInSections.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.renderCategory = this.renderCategory.bind(this);
    this.closeQuestionInformation = this.closeQuestionInformation.bind(this);
    this.informationAboutQuestion = this.informationAboutQuestion.bind(this);
    this.state = {
      questions: [],
      options: [],
      sectionId: '',
      file: null,
      questionsVisibility: false,
      questionId: '',
      questionInformationVisibility: false

    };
  }


  closeQuestionInformation = () => {
    this.setState(() => ({ questionInformationVisibility: false }))
  }
  handleChangeSelect(event) {
    this.setState({ sectionId: event.target.value });
  }

  schedulesInSections() {
    let data = this.state.questions;



    const url = 'http://localhost:8080/scheduleQuestionsInSections/' + this.state.sectionId;
    let fetchData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      response: true,
      body: JSON.stringify(data)

    }
    fetch(url, fetchData)
      .then(res => res.json())
      .then(data => this.setState({
        sectionId: data.id
      }));

  }
  componentDidMount() {
    var subjectID = localStorage.getItem('subjectID');
    var quizUrl = 'http://localhost:8080/sectionListForSubject/' + subjectID;
    fetch(quizUrl, {
      mode: 'cors',
      method: "PUT",
      response: true
    })
      .then(res => res.json())
      .then(data => this.setState({ options: data }));

  }

  informationAboutQuestion(questionId) {
    this.setState({
      questionId: questionId,
      questionInformationVisibility: true
    })
  }

  fileUpload(file) {

    const url = 'http://localhost:8080/fileUploadPlease';
    let formData = new FormData();
    formData.append('file', file)

    let fetchData = {
      method: 'POST',
      body: formData,
      response: true


    }
    fetch(url, fetchData)
      .then(res => res.json())
      .then(data => this.setState({
        questions: data,
        questionsVisibility: true
      }));


  }

  onChangeFile(e) {
    this.setState({ file: e.target.files[0] })
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.fileUpload(this.state.file);

  }
  renderCategory(category) {
    if (category == "EASY") {
      return "Lak"
    } else if (category == "MEDIUM") {
      return "Srednje"
    } else if (category == "HARD") {
      return "Tezak"
    }
  }
  //RENDER FUNKCIJE
  renderQuestions() {
    return this.state.questions.map(question => (
      <tr key={question.id}>

        <td>{question.name}</td>
        <td>{question.type}</td>
        <td>{this.renderCategory(question.category)}</td>
        <td>{question.plusPoints}</td>
        <td>
          <input type="button" className="rounded-button btn button-primary-color" value="Informacije o pitanju"
            onClick={(e) => {
              this.informationAboutQuestion(question.id);
            }} />
        </td>
      </tr>
    ))
  }
  render() {

    return (
      <div >
        <Header activeLink="importFile" />

        <div className="row className padding-top-5 padding-left-5">
          <div className="offset-lg-4 col-lg-6">
            <form onSubmit={this.onFormSubmit} >
              <div className="row">
                <div className="form-group col-lg-5">
                  <label className="text-color form-padding" > Odaberite fajl:</label>
                  <input type="file" id="myuniqueid" onChange={this.onChangeFile} />
                  <label htmlFor="myuniqueid" className="fa fa-upload margin-left-button">Odabir</label>
                </div>
              </div>
              <div className="row padding-top-5">
                <div className="form-group col-lg-5">
                  <button className="btn button-primary-color btn-lg btn-block" type="submit">Učitaj</button>

                </div> </div>
            </form>
          </div>
        </div>



        {this.state.questionsVisibility && <div className="row form-padding" >
          <div className="offset-lg-1 col-lg-5 ">
            <table className="table table-hover table-centered" >
              <thead >
                <tr >
                  <th>Naziv pitanja</th>
                  <th>Tip</th>
                  <th>Kategorija težine</th>
                  <th>Broj bodova</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>

              <tbody>
                {this.renderQuestions()}
              </tbody>
            </table>

          </div>

          <div className=" col-lg-6 padding-top-5 ">
            <div className="row padding-left-10 ">
              <div className=" col-lg-6 " >
                <label className="text-color">Odaberite oblast kojoj pitanja pripadaju : </label>
              </div>
            </div>


            <div className="row form-padding">
              <div className=" offset-lg-1 col-lg-4 ">
                <select className="form-control form-control-lg" name="Oblasti"
                  onChange={this.handleChangeSelect}>
                  {this.state.options.map(opt => {
                    return (
                      <option
                        key={opt.id}
                        value={opt.id}>{opt.name}</option>
                    );
                  })}
                </select>
              </div>

              <div className=" col-lg-6 ">
                <button className="rounded-button btn button-primary-color" onClick={
                  (e) => {
                    this.schedulesInSections();
                  }
                } >Dodaj </button>
              </div>
            </div>
          </div>


          <QuestionInformation
            questionId={this.state.questionId}
            questionInformationVisibility={this.state.questionInformationVisibility}
            closeQuestionInformation={this.closeQuestionInformation}
          />

        </div>}
      </div>
    );
  }
}


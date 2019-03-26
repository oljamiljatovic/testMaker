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
    this.fileUpload = this.fileUpload.bind(this);
    this.renderCategory = this.renderCategory.bind(this);
    this.closeQuestionInformation = this.closeQuestionInformation.bind(this);
    this.informationAboutQuestion = this.informationAboutQuestion.bind(this);
    this.getTextColor = this.getTextColor.bind(this);

    this.state = {
      questions: [],
      options: [],
      sectionId: '',
      //file: null,
      questionsVisibility: false,
      questionId: '',
      questionInformationVisibility: false

    };
  }

  simulateClick(e) {
    if(e != null){
    e.click()
    }
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
      .then(data => {this.setState({
        sectionId: data.id
      })
      this.refs.popUp.click();
    });

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
      })

    );
  }

  onChangeFile(e) {
   this.fileUpload(e.target.files[0]);
  }

  getTextColor(category){
    if (category == "HARD") {
        return 'hard-question';
      } else if (category == "MEDIUM") {
        return 'medium-question';
      } else if (category == "EASY") {
        return 'easy-question';
      } 
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
        <td>{question.text.substring(0,40) + "..."}
              <span className="spnTooltip"> {question.text}
              </span>
        </td>
        <td>{question.type}</td>
        <td className={this.getTextColor(question.category)}>{this.renderCategory(question.category)}</td>
   
        <td>
        <div className = "button_div_info"  onClick={(e) => {
                        this.informationAboutQuestion(question.id);
                    }}>
                        <span className="fa fa-info"></span>
        </div>
        </td>
      </tr>
    ))
  }
  render() {

    return (
      <div >
        <Header activeLink="importFile" />

        <a ref = "popUp" href = "#popup1"></a>
                <div id="popup1" className="overlay">
                <div className="popup">
                    {/* <h2>Uspesno</h2> */}
                    <a className="close" href="#">&times;</a>
                    <div className="content">
                    <div className = "fa fa-check-circle-o">&nbsp;&nbsp;</div>
                    <span> Pitanja su smestena u odabranu sekciju!</span>
                        
                    </div>
                    </div>
                </div>

        <div className="row  modal-title-padding ">
          <div className="offset-lg-5 col-lg-2">

              <div className = "row">
                <div className = "offset-lg-3 col-lg-6">
                  <input type="file" id="myuniqueid" onChange={this.onChangeFile}
                      ref={this.simulateClick} onClick={()=> console.log('clicked')}
                  />
                  <label htmlFor="myuniqueid" className="fa fa-upload rounded-button btn-lg"></label>
              </div>
              </div>
          </div>
        </div>



        {this.state.questionsVisibility && <div className="row form-padding" >
          <div className="offset-lg-1 col-lg-7 ">
            <table className="table table-hover section-table" >
              <thead >
                <tr >
                  <th>Naziv pitanja</th>
                  <th>Tekst</th>
                  <th>Tip</th>
                  <th>Težina</th>
                 
                  <th>&nbsp;</th>
                </tr>
              </thead>

              <tbody>
                {this.renderQuestions()}
              </tbody>
            </table>

          </div>

          <div className=" offset-lg-1 col-lg-3">
          <div className = "center_div"> 
                <div className="row ">
                    <div className=" col-lg-12 " >
                      <label className="text-color">Oblast kojoj pitanja pripadaju : </label>
                    </div>
                </div>
                <div className="row form-padding">
              <div className=" col-lg-6 ">
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
              <button type="button" className = "rounded-button btn-lg button-primary-color  fa fa-check" onClick={
                  (e) => {
                    this.schedulesInSections();
                  }
                }></button>
              {/*   <button className="rounded-button btn button-primary-color" onClick={
                  (e) => {
                    this.schedulesInSections();
                  }
                } >Dodaj </button> */}
              </div>
            </div>
          </div>
          


          
          </div>


          { this.state.questionInformationVisibility &&    <QuestionInformation
            questionId={this.state.questionId}
            questionInformationVisibility={this.state.questionInformationVisibility}
            closeQuestionInformation={this.closeQuestionInformation}
          />}

        </div>}
      </div>
    );
  }
}


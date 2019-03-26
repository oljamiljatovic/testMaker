import React from 'react';
import ReactDOM from 'react-dom';
import AddSubject from './addSubject';
import SectionList from './SectionList';
import Header from './Header';
import QuestionInformation from './QuestionInformation';
export default class TestList extends React.Component {

    constructor(props) {
        super(props);
        this.testsForSubject = this.testsForSubject.bind(this);
        this.questionsForTest = this.questionsForTest.bind(this);
        this.informationAboutQuestion = this.informationAboutQuestion.bind(this);
        this.closeQuestionInformation = this.closeQuestionInformation.bind(this);
        this.export = this.export.bind(this);
        this.renderCategory = this.renderCategory.bind(this);
        this.getTextColor = this.getTextColor.bind(this);
        this.deleteTest = this.deleteTest.bind(this);
        this.state = {
            testList: [],
            questionList: [],
            testsVisibility: false,
            questionsVisibility: false,
            questionInformationVisibility: false,
            questionId: ''
        };
    }

    testsForSubject(subjectId) {

        var quizUrl = 'http://localhost:8080/getTestsForSubject/' + subjectId;
        fetch(quizUrl, {
            mode: 'cors',
            method: "PUT",
            response: true
        })
            .then(res => res.json())
            .then(data => this.setState({
                testList: data,
                testsVisibility: true
            }));
    }

    questionsForTest(testId) {

        var quizUrl = 'http://localhost:8080/questionsForTest/' + testId;
        fetch(quizUrl, {
            mode: 'cors',
            method: "PUT",
            response: true
        })
            .then(res => res.json())
            .then(data => this.setState({
                questionList: data,
                questionsVisibility: true
            }));
    }

    informationAboutQuestion(questionId) {
        this.setState({
            questionId: questionId,
            questionInformationVisibility: true
        })

    }

    closeQuestionInformation = () => {
        this.setState(() => ({ questionInformationVisibility: false }))
    }

    export(testId) {
        var quizUrl = 'http://localhost:8080/exportTest/' + testId;
        fetch(quizUrl, {
            mode: 'cors',
            method: "PUT",
            response: true
        })
            .then(res => res.json())
            .then(data => {console.log("test id" + data.id);  this.refs.popUp.click();});
    }


    componentDidMount() {
         this.testsForSubject(localStorage.getItem('subjectID'));
    }

    deleteTest(testId){
        var quizUrl = 'http://localhost:8080/' + testId;
        fetch(quizUrl, {
            mode: 'cors',
            method: "DELETE"
        })
            .then(res => { const arrayCopy = this.state.testList.filter((row) => row.id !== testId);
                this.setState({testList: arrayCopy});});     
    }

    renderTests() {
        return this.state.testList.map(test => (
            <tr key={test.id}>
                {/* <td>{test.name}</td> */}
                <td>{test.name.substring(0,5) + "..."}
                        <span className="spnTooltip"> {test.name}
                        </span> 
                </td>

                <td>{test.label}</td>
                <td>{test.questionList.length}</td>
                <td>{test.groupTag}</td>
                <td> <div className = "button_div_list"  onClick={(e) => {
                            this.export(test.id);
                        }} >
                        <span className="fa fa-cloud-download "></span>
                    </div> 
            
                    <div className = "button_div_add"  onClick={(e) => {
                                this.questionsForTest(test.id);
                        }} >
                        <span className="fa fa-question"></span>
                        {/* <span className="fa fa-question"></span> */}
                    </div>
                    <div className = "button_div_info_2"  >
                        <span className="fa fa-info"></span>
                    </div>
                    <div className = "button_div_add"  onClick={(e) => {
                                this.deleteTest(test.id);
                        }} >
                        <span className="fa fa-times"></span>
                    
                    </div>
                </td>
                
            </tr>
        ))
    }
    renderQuestions() {
        return this.state.questionList.map(question => (
            <tr key={question.id}>
                <td>{question.name}</td>
                <td>{question.text.substring(0,15) + "..."}
                        <span className="spnTooltip"> {question.text}
                        </span> 
                </td>
                <td className={this.getTextColor(question.category)}>
                        {this.renderCategory(question.category)}
                </td>
                <td>
                <div className = "button_div_info"  onClick={(e) => {
                        this.informationAboutQuestion(question.id);
                    }}>
                        <span className="fa fa-info"></span>
        </div>
                  {/*   <input type="button" className = "btn rounded-button button-primary-color" value="Informacije"
                        onClick={(e) => {
                            this.informationAboutQuestion(question.id);
                        }} /> */}
                </td>
            </tr>
        ))
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

      getTextColor(category){
        if (category == "HARD") {
            return 'hard-question';
          } else if (category == "MEDIUM") {
            return 'medium-question';
          } else if (category == "EASY") {
            return 'easy-question';
          } 
      }

    render() {

        return (
            <div>
                <Header activeLink="testList" />
                <a ref = "popUp" href = "#popup1"></a>
                <div id="popup1" className="overlay">
                <div className="popup">
                    {/* <h2>Uspesno</h2> */}
                    <a className="close" href="#">&times;</a>
                    <div className="content">
                    <div className = "fa fa-check-circle-o">&nbsp;&nbsp;</div>
                    <span> Uspesno ste kreirali i exportovali test!</span>
                        
                    </div>
                    </div>
                </div>


                <div className="row form-padding">
                    <div className="offset-lg-1 col-lg-5">
                        {this.state.testsVisibility && <table className=" table table-hover section-table" >
                            <thead >
                                <tr >
                                    <th>Naziv</th>
                                    <th>Oznaka </th>
                                    <th>Broj pitanja </th>
                                    <th>Grupa</th>
                                    <th>&nbsp; </th>
                                  
                                </tr>
                            </thead>

                            <tbody>
                                {this.renderTests()}
                            </tbody>
                        </table>
                        }
                    </div>

                    <div className="col-lg-5  ">
                        {this.state.questionsVisibility && <table className=" table table-hover section-table" >
                            <thead >
                                <tr >
                                    
                                    <th>Naziv</th>
                                    <th>Tekst</th>
                                    <th>Tezina</th>
                                    <th>&nbsp; </th>

                                </tr>
                            </thead>

                            <tbody>
                                {this.renderQuestions()}
                            </tbody>
                        </table>
                        }
                    </div>
                </div>
                { this.state.questionInformationVisibility && <QuestionInformation
                    questionId={this.state.questionId}
                    questionInformationVisibility={this.state.questionInformationVisibility}
                    closeQuestionInformation={this.closeQuestionInformation}
                />}

            </div>
        );
    }

}
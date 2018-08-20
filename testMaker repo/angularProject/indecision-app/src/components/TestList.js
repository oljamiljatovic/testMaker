import React from 'react';
import ReactDOM from 'react-dom';
import AddSubject from './addSubject';
import SectionList from './SectionList';
import Header from './Header';
import QuestionInformation from './QuestionInformation';
export default class TestList extends React.Component{

    constructor(props) {
        super(props);
        this.testsForSubject = this.testsForSubject.bind(this);
        this.questionsForTest = this.questionsForTest.bind(this);
        this.informationAboutQuestion = this.informationAboutQuestion.bind(this);
        this.closeQuestionInformation = this.closeQuestionInformation.bind(this);
        this.export = this.export.bind(this);
        this.state = {
          subjectList : [],
          testList : [],
          questionList : [],
          testsVisibility : false,
          questionsVisibility :false,
          questionInformationVisibility :false,
          questionId : ''
        };
      }

      testsForSubject(subjectId){

        var quizUrl = 'http://localhost:8080/getTestsForSubject/'+subjectId;
        fetch(quizUrl, {
          mode: 'cors',
          method: "PUT",
          response: true
        })
        .then(res => res.json())
        .then(data => this.setState({testList: data,
        testsVisibility : true}));
      }

      questionsForTest(testId){

       var quizUrl = 'http://localhost:8080/questionsForTest/'+testId;
        fetch(quizUrl, {
          mode: 'cors',
          method: "PUT",
          response: true
        })
        .then(res => res.json())
        .then(data => this.setState({questionList: data,
        questionsVisibility : true})); 
      }

      informationAboutQuestion(questionId){
        alert("InformationAboutQuestion");
        this.setState({
            questionId : questionId,
            questionInformationVisibility : true
        })
        
      }

      closeQuestionInformation = () => {
        this.setState(() => ({questionInformationVisibility :false}))
    }
    
    export(testId){
        var quizUrl = 'http://localhost:8080/exportTest/'+testId;
        fetch(quizUrl, {
          mode: 'cors',
          method: "PUT",
          response: true
        })
        .then(res => res.json())
        .then(data => console.log("test id"+ data.id));
    }


      componentDidMount() {
        var quizUrl = 'http://localhost:8080/subjectList';
        fetch(quizUrl, {
          mode: 'cors',
          method: "GET",
          response: true
        })
        .then(res => res.json())
        .then(data => this.setState({subjectList: data}));
      }

      renderSubjects() {
        return this.state.subjectList.map(subject => (
                <tr key={subject.id}>
                    <td>{subject.id}</td>
                    <td>{subject.name}</td>
                    <td>
                        <input type="button" className = "btn btn-primary" value="Testovi" 
                        onClick={(e) => {
                            this.testsForSubject(subject.id);
                        }}/>
                    </td> 
                </tr>
        ))
    }
    renderTests() {
        return this.state.testList.map(test => (
                <tr key={test.id}>
                    <td>{test.name}</td>
                     <td>
                        <input type="button" className = "btn btn-primary" value="Pitanja iz testa" 
                        onClick={(e) => {
                            this.questionsForTest(test.id);
                        }}/>
                    </td>  
                    <td>
                        <input type="button" className = "btn btn-primary" value="Export u fajl" 
                        onClick={(e) => {
                            this.export(test.id);
                        }}/>
                    </td>  
                </tr>
        ))
    }
    renderQuestions() {
        return this.state.questionList.map(question => (
                <tr key={question.id}>
                    <td>{question.id}</td>
                    <td>{question.name}</td>
                  <td>
                        <input type="button" value="Informacije" 
                        onClick={(e) => {
                            this.informationAboutQuestion(question.id);
                        }}/>
                    </td>  
                </tr>
        ))
    }

    
    render() {
      
        return(
            <div>
                <Header activeLink = "testList" /> 
            <div className = "questionAndAnswers">
                <br />
                <table  className="table table-hover table-centered">
                    <thead className="thead-light">
                        <tr >
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.renderSubjects()}
                    </tbody>
                </table>
               
                <div>
                <br />
                {this.state.testsVisibility &&  <table >
                    <thead>
                        <tr >
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.renderTests()}
                    </tbody>
                </table>
                     }
            </div>
            <div>
                <br />
                {this.state.questionsVisibility &&   <table >
                    <thead>
                        <tr >
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.renderQuestions()}
                    </tbody>
                </table>
                }
            </div>
            <div >
                     
                     <QuestionInformation
                       questionId = {this.state.questionId}
                       questionInformationVisibility = {this.state.questionInformationVisibility}
                       closeQuestionInformation = {this.closeQuestionInformation}
                      /> 
                     
                  </div> 

            </div>
               </div>
        );
    }

}
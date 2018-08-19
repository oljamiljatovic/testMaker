import React from 'react';
import ReactDOM from 'react-dom';
import QuestionInformation from './QuestionInformation';
export default class QuestionsForTest extends React.Component{

    constructor(props) {
        super(props);
        this.informationAboutQuestion = this.informationAboutQuestion.bind(this);
        this.addToTheTest = this.addToTheTest.bind(this);
        this.removeFromTheTest = this.removeFromTheTest.bind(this);
        this.createTest = this.createTest.bind(this);
        //this.closeQuestionInformation = this.closeQuestionInformation.bind(this);
         this.state = {
          questionList : [],
          choosenQuestionList : [],
          sectionId : props.sectionId,
          questionId : -1,
          questionInformationVisibility : false
        }; 
      }

      componentDidMount() {
        var quizUrl = 'http://localhost:8080/questionList/'+this.state.sectionId;
        fetch(quizUrl, {
          mode: 'cors',
          method: "PUT",
          response: true
        })
        .then(res => res.json())
        .then(data => this.setState({questionList: data}));

      }

      componentWillReceiveProps(nextProps){
        if(nextProps.sectionId !== this.props.sectionId) {
            var quizUrl = 'http://localhost:8080/questionList/'+nextProps.sectionId;
            fetch(quizUrl, {
              mode: 'cors',
              method: "PUT",
              response: true
            })
            .then(res => res.json())
            .then(data => this.setState({questionList: data,
                sectionId : nextProps.sectionId
            }));
          }
      }
      
      informationAboutQuestion(questionId){
  
        this.setState({
            questionId : questionId,
            questionInformationVisibility : true
        })
      }
      closeQuestionInformation = () => {
        this.setState(() => ({questionInformationVisibility :false}))
    }

      addToTheTest(question){
        var newArray = this.state.choosenQuestionList.slice();    
        newArray.push(question);   
        this.setState({choosenQuestionList:newArray});
        
        for (var i = 0; i < this.state.questionList.length; i++) {
            var obj = this.state.questionList[i];
        
            if (question.id === obj.id ) {
                this.state.questionList.splice(i, 1);
                i--;
            }
        }
        //this.props.getQuestions(this.state.choosenQuestionList);

      }

      removeFromTheTest(question){
        var newArray = this.state.questionList.slice();    
        newArray.push(question);   
        this.setState({questionList:newArray});
        
        for (var i = 0; i < this.state.choosenQuestionList.length; i++) {
            var obj = this.state.choosenQuestionList[i];
        
            if (question.id === obj.id ) {
                this.state.choosenQuestionList.splice(i, 1);
                i--;
            }
        } 
      }

      createTest(){
            this.props.getQuestions(this.state.choosenQuestionList);
      }
      renderProducts() {
        return this.state.questionList.map(question => (
                <tr key={question.id}>
                    <td>{question.id}</td>
                    <td>{question.name}</td>
                    <td>{question.text}</td>
                    <td>
                        <input type="button" value="Informacije o pitanju" 
                        onClick={(e) => {
                            this.informationAboutQuestion(question.id);
                        }}/>
                    </td> 
                    <td>
                        <input type="button" value="Dodaj u test" 
                        onClick={(e) => {
                            this.addToTheTest(question);
                        }}/>
                    </td> 
                </tr>
        ))
    } 
    renderChoosenQuestion() {
        return this.state.choosenQuestionList.map(question => (
                <tr key={question.id}>
                    <td>{question.id}</td>
                    <td>{question.name}</td>
                    <td>{question.text}</td>
                    <td>
                        <input type="button" value="Informacije" 
                        onClick={(e) => {
                            this.informationAboutQuestion(question.id);
                        }}/>
                    </td> 
                    <td>
                        <input type="button" value="Izbaci iz testa" 
                        onClick={(e) => {
                            this.removeFromTheTest(question);
                        }}/>
                    </td> 
                </tr>
        ))
    } 
    

render() {
    return(
        <div>
        <div className = "questionAndAnswers">
            <br />
            <table >
                <thead>
                    <tr >
                        <th>ID</th>
                        <th>Name</th>
                        <th>Text</th>
                    </tr>
                </thead>

                <tbody>
              {this.renderProducts()} 
                </tbody>
            </table>

                <div> 
                <table >
                <thead>
                    <tr >
                        <th>ID</th>
                        <th>Name</th>
                        <th>Text</th>
                    </tr>
                </thead>

                <tbody>
              {this.renderChoosenQuestion()} 
                </tbody>
            </table>
                </div>
             
        </div>
        <div >
                     
                     <QuestionInformation
                       questionId = {this.state.questionId}
                       questionInformationVisibility = {this.state.questionInformationVisibility}
                       closeQuestionInformation = {this.closeQuestionInformation}
                      /> 
                     
                  </div> 
        <button  onClick={(e) => {
                            this.createTest();
                        }} >Ubaci odabrana pitanja </button>
        </div>
    );
}
}
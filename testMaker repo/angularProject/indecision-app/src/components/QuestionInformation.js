import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

export default class QuestionInformation extends React.Component{

    constructor(props) {
        super(props);
        this.openChangeQuestionDiv = this.openChangeQuestionDiv.bind(this);
        this.changeQuestion = this.changeQuestion.bind(this);
        this.changeAnswer = this.changeAnswer.bind(this);
        this.openChangeAnswerDiv = this.openChangeAnswerDiv.bind(this);
        this.getAnswersForQuestion = this.getAnswersForQuestion.bind(this);
        this.state = {
          questionId : this.props.questionId,
          informationVisibility : this.props.informationVisibility,
          answerVisibility :false,
          question : {},
          changeQuestionDivVisibility : false,
          answerId : -1,
          answer :{}
        };
      }

      openChangeQuestionDiv(){
        this.setState({changeQuestionDivVisibility: true});
        
      }

       openChangeAnswerDiv(answerId){
        this.setState({changeAnswerDivVisibility: true});

        this.state.question.answerList.forEach(element => {
          if(element.id == answerId){
            this.setState({ 
              answer : element})
          }
        });
      } 
      changeQuestion(e){
          e.preventDefault();
  
          const questionId = e.target.elements.questionId.value;
          const questionName = e.target.elements.questionName.value.trim();
          const questionText = e.target.elements.questionText.value.trim();
          const questionType = e.target.elements.questionType.value;

          const url = 'http://localhost:8080/changeQuestion/';
          let data = {
              id : questionId,
              name : questionName,
              text :questionText,
              type : questionType
          }
        
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
            question : data}) );
     
    
      }

      changeAnswer(e){
        e.preventDefault();

        const answerId = e.target.elements.answerId.value;
        const answerExactitude = e.target.elements.answerExactitude.value;
        const answerText = e.target.elements.answerText.value;

       const questionId = e.target.elements.questionInAnswerId.value;
        //const questionType = e.target.elements.questionType.value;
 
        const url = 'http://localhost:8080/changeAnswer/'+questionId;
        let data = {
            id : answerId,
            exactitude : answerExactitude,
            text :answerText
            
        }
      
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
        .then(data => this.setState({ question : data}) ); 
    }

      getAnswersForQuestion(){
        console.log(this.state.question.answerList);
        this.setState({ 
          answerVisibility : true})
      }

      componentWillReceiveProps(nextProps){
        if(nextProps.questionId !== this.props.questionId) {
            var quizUrl = 'http://localhost:8080/question/'+nextProps.questionId;
            fetch(quizUrl, {
              mode: 'cors',
              method: "PUT",
              response: true
            })
            .then(res => res.json())
            .then(data => this.setState({question: data, 
              changeQuestionDivVisibility : false}));
            // nextProps.myProp has a different value than our current prop
            // so we can perform some calculations based on the new value
          }
      }

      renderAnswers() {
        return this.state.question.answerList.map(answer => (
                <tr key={answer.id}>
                    <td>{answer.id}</td>
                    <td>{answer.text}</td>
                    <td>{answer.exactitude? 'tacan odgovor': 'netacan odgovor'}</td>
                   
                    <td><button onClick={
                (e) => {
                    this.openChangeAnswerDiv(answer.id);
                }
            }  >Promijeni </button></td> 
            
                </tr>
        ))
    }
      render() {

        return (
            <Modal
            isOpen = {this.props.questionInformationVisibility}
            contentLabel = "Information"
            onRequestClose ={this.props.closeQuestionInformation}>
<div className = "questionAndAnswers">
            <div>
            <p>Id pitanja : {this.state.question.id} </p>
            <p>Ime pitanja : {this.state.question.name} </p>
            <p>Tekst pitanja : {this.state.question.text} </p>
            {this.state.question.type === '/c' &&   <button onClick={this.getAnswersForQuestion}>Odgovori </button>}   
            <button onClick={this.openChangeQuestionDiv} >Promijeni </button>
            </div>

             {this.state.answerVisibility && 
          <div>
            <table >
                    <thead>
                        <tr >
                            <th>ID</th>
                            <th>Text</th>
                            <th>Tacnost</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.renderAnswers()}
                    </tbody>
                </table>
          </div>}

</div>
<div>
          {this.state.changeQuestionDivVisibility && 
          <div>
              <form onSubmit={this.changeQuestion}>
                 <input type ="hidden" name = "questionId" defaultValue = {this.state.question.id}/>
                 <p>Naziv pitanja : </p>
                 <input type="text" name="questionName" defaultValue ={this.state.question.name} /> <br/>
                 <p>Tekst pitanja : </p>
                 <input type="text" name="questionText" defaultValue = {this.state.question.text}/> 
                 <input type="hidden" name="questionType" defaultValue = {this.state.question.type}/><br/><br/>
                 <button>Promijeni</button>
              </form>
          </div>}


        {this.state.changeAnswerDivVisibility && 
          <div>
            
              <form onSubmit={this.changeAnswer}>
              <input type ="hidden" name = "questionInAnswerId" defaultValue = {this.state.question.id}/>
                 <input type ="hidden" name = "answerId" defaultValue = {this.state.answer.id}/>
                 <p>Naziv pitanja : </p>
                 <input type="text" name="answerExactitude" defaultValue ={this.state.answer.exactitude} /> <br/>
                 <p>Tekst pitanja : </p>
                 <input type="text" name="answerText" defaultValue = {this.state.answer.text}/> 
              {/*    <input type="hidden" name="questionType" defaultValue = {this.state.question.type}/><br/> */}<br/>
                 <button>Promijeni</button>
              </form> 
          </div>}

</div>
          <br/>
            
            <button onClick={this.props.closeQuestionInformation} >Close </button>
            </Modal>

        );
      }
}
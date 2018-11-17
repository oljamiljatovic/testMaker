import React from 'react';
import ReactDOM from 'react-dom';
import QuestionInformation from './QuestionInformation';
export default class QuestionList extends React.Component{

    constructor(props) {
        super(props);
        this.informationAboutQuestion = this.informationAboutQuestion.bind(this);
        this.closeQuestionInformation = this.closeQuestionInformation.bind(this);
        this.renderCategory = this.renderCategory.bind(this);
         this.state = {
          questionList : [ 
          ],
          sectionId : props.sectionId,
          questionId : -1,
          questionInformationVisibility : false
        }; 
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
            // nextProps.myProp has a different value than our current prop
            // so we can perform some calculations based on the new value
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

      
     renderProducts() {
        return this.state.questionList.map(question => (
                <tr key={question.id}>
                    <td>{question.name}</td>
                    <td>{this.renderCategory(question.category)}</td>
                    <td>
                    {  <input type="button" className= "rounded-button btn button-primary-color" value="Informacije"
                        onClick={(e) => {
                            this.informationAboutQuestion(question.id);
                        }}/>}
                    </td>  
                </tr>
        ))
    } 

    
    render() {
        return(
          
             <div className = "col-lg-12 " >
                <table className="table table-hover table-centered fixed_header" >
                    <thead> 
                        <tr >
                           <th>Oznaka pitanja </th>
                           <th>Težina pitanja </th>
                           <th> &nbsp; </th>
                        </tr>
                    </thead>

                    <tbody >
                  {this.renderProducts()} 
                    </tbody>
                </table>
                <div >
                     
                   <QuestionInformation
                     questionId = {this.state.questionId}
                     questionInformationVisibility = {this.state.questionInformationVisibility}
                     closeQuestionInformation = {this.closeQuestionInformation}
                    /> 
                   
                </div> 
            </div> 
            
        );
    }
}
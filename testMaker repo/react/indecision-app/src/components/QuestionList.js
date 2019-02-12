import React from 'react';
import ReactDOM from 'react-dom';
import QuestionInformation from './QuestionInformation';
export default class QuestionList extends React.Component{

    constructor(props) {
        super(props);
        this.informationAboutQuestion = this.informationAboutQuestion.bind(this);
        this.closeQuestionInformation = this.closeQuestionInformation.bind(this);
        this.renderCategory = this.renderCategory.bind(this);
        this.getTextColor = this.getTextColor.bind(this);
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

      getTextColor(category){
        if (category == "HARD") {
            return 'hard-question';
          } else if (category == "MEDIUM") {
            return 'medium-question';
          } else if (category == "EASY") {
            return 'easy-question';
          } 
      }

      /* renderText(text){
          return text.substring(0,8);
      } */
     renderProducts() {
        return this.state.questionList.map(question => (
                <tr key={question.id} >
                    <td>{question.name}</td>
                    <td>{question.text.substring(0,15) + "..."}
                        <span className="spnTooltip"> {question.text}
                        </span> 
                    </td>
                    <td className={this.getTextColor(question.category)}>
                        {this.renderCategory(question.category)}</td>
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
        return(
          
             <div className = "col-lg-12 " >
                <table className=" table table-hover section-table " >{/* fixed_header */}
                    <thead> 
                        <tr >
                           <th>Oznaka  </th>
                           <th>Tekst  </th>
                           <th>Težina  </th>
                           <th> &nbsp; </th>
                        </tr>
                    </thead>
  
                    <tbody >
                  {this.renderProducts()} 
                    </tbody>
                </table>
        
                <div className = "dropdown-content"> 
                    <p>Tekst pitanja ce ici ovdje </p>
                </div>
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
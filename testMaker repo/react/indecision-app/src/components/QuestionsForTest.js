import React from 'react';
import ReactDOM from 'react-dom';
import QuestionInformation from './QuestionInformation';
export default class QuestionsForTest extends React.Component {

    constructor(props) {
        super(props);
        this.informationAboutQuestion = this.informationAboutQuestion.bind(this);
        this.addToTheTest = this.addToTheTest.bind(this);
        this.removeFromTheTest = this.removeFromTheTest.bind(this);
        this.createTest = this.createTest.bind(this);
        this.renderCategory = this.renderCategory.bind(this);
        this.getTextColor = this.getTextColor.bind(this);
        //this.closeQuestionInformation = this.closeQuestionInformation.bind(this);
        this.state = {
            questionList: [],
            choosenQuestionList: [],
            sectionId: props.sectionId,
            questionId: -1,
            questionInformationVisibility: false
        };
    }

    componentDidMount() {
        var quizUrl = 'http://localhost:8080/questionList/' + this.state.sectionId;
        fetch(quizUrl, {
            mode: 'cors',
            method: "PUT",
            response: true
        })
            .then(res => res.json())
            .then(data => this.setState({ questionList: data }));

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sectionId !== this.props.sectionId) {
            var quizUrl = 'http://localhost:8080/questionList/' + nextProps.sectionId;
            fetch(quizUrl, {
                mode: 'cors',
                method: "PUT",
                response: true
            })
                .then(res => res.json())
                .then(data => this.setState({
                    questionList: data,
                    sectionId: nextProps.sectionId
                }));
        }
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

    addToTheTest(question) {
        var newArray = this.state.choosenQuestionList.slice();
        newArray.push(question);
        this.setState({ choosenQuestionList: newArray });

        for (var i = 0; i < this.state.questionList.length; i++) {
            var obj = this.state.questionList[i];

            if (question.id === obj.id) {
                this.state.questionList.splice(i, 1);
                i--;
            }
        }
        //this.props.getQuestions(this.state.choosenQuestionList);

    }

    removeFromTheTest(question) {
        var newArray = this.state.questionList.slice();
        newArray.push(question);
        this.setState({ questionList: newArray });

        for (var i = 0; i < this.state.choosenQuestionList.length; i++) {
            var obj = this.state.choosenQuestionList[i];

            if (question.id === obj.id) {
                this.state.choosenQuestionList.splice(i, 1);
                i--;
            }
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

    createTest() {
        //e.preventDefault();
        this.props.getQuestions(this.state.choosenQuestionList);
    }
    renderProducts() {
        return this.state.questionList.map(question => (
            <tr key={question.id}>
                <td>{question.name}</td>
                <td>{question.text.substring(0,25) + "..."}
                        <span className="spnTooltip"> {question.text}
                        </span> 
                </td>
                <td className={this.getTextColor(question.category)}>
                        {this.renderCategory(question.category)}
                </td>
                   
                <td>
                   <div className = "button_div_list"  onClick={(e) => {
                        this.informationAboutQuestion(question.id);
                    }}>
                        <span className="fa fa-info"></span>
                    </div> 
                
                    <div className = "button_div_add"  onClick={(e) => {
                            this.addToTheTest(question);
                     }}>
                        <span className="fa fa-plus"></span>
                    </div>
                </td>
               
            </tr>
        ))
    }
    renderChoosenQuestion() {
        return this.state.choosenQuestionList.map(question => (
            <tr key={question.id}>
                <td>{question.name}</td>
                <td>{question.text.substring(0,25) + "..."}
                        <span className="spnTooltip"> {question.text}
                        </span> 
                </td>
               
                <td className={this.getTextColor(question.category)}>
                        {this.renderCategory(question.category)}
                </td>
                <td>
                <div className = "button_div_list"  onClick={(e) => {
                        this.informationAboutQuestion(question.id);
                    }}>
                        <span className="fa fa-info"></span>
               </div> 
            
                <div className = "button_div_add"  onClick={(e) => {
                        this.removeFromTheTest(question);
                    }}>
                    <span className="fa fa-minus"></span>
                </div>
                {/*     <input type="button"  className = "rounded-button btn button-primary-color" value="Informacije"
                        onClick={(e) => {
                            this.informationAboutQuestion(question.id);
                        }} />
                </td>

                 <td>
                    <input type="button" className = "rounded-button btn button-secondary-color" value="Izbaci iz testa"
                        onClick={(e) => {
                            this.removeFromTheTest(question);
                        }} /> */}
                </td>
               
            </tr>
        ))
    }


    render() {
        return (
            <div className="row form-padding ">

                <div className="col-lg-6 ">
                <label className ="text-color-bold">Ponuđena pitanja </label>
                    <table  className="table table-hover section-table" >
                        <thead >
                            <tr >
                                
                                <th>Naziv</th>
                                <th>Tekst</th>
                                <th>Težina  </th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.renderProducts()}
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-6 ">
                <label className ="text-color-bold">Odabrana pitanja </label>
                    <table  className="table table-hover section-table" >
                        <thead >
                            <tr >
                              
                                <th>Naziv</th>
                                <th>Tekst</th>
                                <th>Težina</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.renderChoosenQuestion()}
                        </tbody>
                    </table>

                </div>

           

                { this.state.questionInformationVisibility &&   <QuestionInformation
                        questionId={this.state.questionId}
                        questionInformationVisibility={this.state.questionInformationVisibility}
                        closeQuestionInformation={this.closeQuestionInformation}
                    />}
                
            <div className = "offset-lg-10 col-lg-2 ">
                <button type="button" className = "rounded-button btn-lg button-primary-color floating fa fa-check"
                 onClick={(e) => {this.createTest();}}/>
            </div>
            
            </div>
        );
    }
}
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import MyStatefulEditor from './MyStatefulEditor';

export default class QuestionInformation extends React.Component {

    constructor(props) {
        super(props);
       //this.openChangeQuestionDiv = this.openChangeQuestionDiv.bind(this);
        //this.changeQuestion = this.changeQuestion.bind(this);
        //this.changeAnswer = this.changeAnswer.bind(this);
        //this.openChangeAnswerDiv = this.openChangeAnswerDiv.bind(this);
        this.getAnswersForQuestion = this.getAnswersForQuestion.bind(this);
        this.renderCategory = this.renderCategory.bind(this);
        this.changeMinusPoints = this.changeMinusPoints.bind(this);
        this.changePlusPoints = this.changePlusPoints.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.changeEditorState = this.changeEditorState.bind(this);

        this.state = {
            questionId: props.questionId,
            options: ['/c', '/u', '/t'],
            informationVisibility: this.props.informationVisibility,
            answerVisibility: false,
            question: {},
            //changeQuestionDivVisibility: false,
            answerId: -1,
            categoryOptions: [],
            answer: {},
            answerList : [],
            plusPoints: '',
            minusPoints : '',
            name : '',
            questionText : '',
            type : '',
            category : ''
            //expand: false

        };
    }

/*     openChangeQuestionDiv() {
        this.setState({
            changeQuestionDivVisibility: true,
            expand: true,
            changeAnswerDivVisibility: false
        });

    } */

  /*   openChangeAnswerDiv(answerId) {
        this.setState({ changeAnswerDivVisibility: true });

        this.state.question.answerList.forEach(element => {
            if (element.id == answerId) {
                this.setState({
                    answer: element,
                    expand: true,
                    changeQuestionDivVisibility: false
                })
            }
        });
    } */
/*     changeQuestion(e) {
        e.preventDefault();

        const questionId = e.target.elements.questionId.value;
        const questionName = e.target.elements.questionName.value.trim();
        const questionText = e.target.elements.questionText.value.trim();
        const questionType = e.target.elements.questionType.value;

        const url = 'http://localhost:8080/changeQuestion/';
        let data = {
            id: questionId,
            name: questionName,
            text: questionText,
            type: questionType
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
                question: data
            }));


    } */

  /*   changeAnswer(e) {
        e.preventDefault();

        const answerId = e.target.elements.answerId.value;
        const answerExactitude = e.target.elements.answerExactitude.value;
        const answerText = e.target.elements.answerText.value;

        const questionId = e.target.elements.questionInAnswerId.value;
        //const questionType = e.target.elements.questionType.value;

        const url = 'http://localhost:8080/changeAnswer/' + questionId;
        let data = {
            id: answerId,
            exactitude: answerExactitude,
            text: answerText

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
            .then(data => this.setState({ question: data }));
    } */

    getAnswersForQuestion() {
        console.log(this.state.question.answerList);

        this.setState({
            answerVisibility: true,
            expand: true
        })
    }
    componentDidMount() {
        var quizUrl = 'http://localhost:8080/question/' + this.state.questionId;
        fetch(quizUrl, {
            mode: 'cors',
            method: "PUT",
            response: true
        })
            .then(res => res.json())
            .then(data => this.setState({
                question: data,
                answerList : data.answerList,
                changeQuestionDivVisibility: false,
                name : data.name,
                plusPoints : data.plusPoints,
                minusPoints : data.minusPoints,
                questionText : data.text,
                type : data.type,
                category : data.category
            }));


            var quizUrl = 'http://localhost:8080/categories';
            fetch(quizUrl, {
                mode: 'cors',
                method: "GET",
                response: true
            })
                .then(res => res.json())
                .then(data => this.setState({ categoryOptions: data }));
      }

    componentWillReceiveProps(nextProps) {
        if (nextProps.questionId !== this.props.questionId) {
            var quizUrl = 'http://localhost:8080/question/' + nextProps.questionId;
            fetch(quizUrl, {
                mode: 'cors',
                method: "PUT",
                response: true
            })
                .then(res => res.json())
                .then(data => this.setState({
                    question: data,
                    answerList : data.answerList,
                    changeQuestionDivVisibility: false,
                    name : data.name,
                    plusPoints : data.plusPoints,
                    minusPoints : data.minusPoints,
                    questionText : data.text,
                    type : data.type,
                    category : data.category
                }));
        }
    }

    renderAnswers() {
        return this.state.answerList.map(answer => (
            <tr key={answer.id}>
               {/*  <td>{answer.id}</td> */}
                <td>{answer.text.substring(0,20) + "..."}
                    <span className="spnTooltip"> {answer.text}
                    </span> 
                </td>


                <td>{answer.exactitude ? 'tacan odgovor' : 'netacan odgovor'}</td>

           {/*      <td><button className = "rounded-button btn button-secondary-color" onClick={
                    (e) => {
                        this.openChangeAnswerDiv(answer.id);
                    }
                }  >Promijeni </button></td> */}

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
      changeEditorState(editorText){
        this.setState({ questionText: editorText })
    }

    renderTableWithAnswers() {
        return (
            <div className="scroll-answers row">
                <div className = " offset-lg-1 col-lg-10">
                    <table className="table table-hover " >
                        <thead>
                            <tr >
                                <th>Tekst</th>
                                <th>Tačnost</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.renderAnswers()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
 
    changeName(event) {

        this.setState({name : event.target.value});
      }

      changePlusPoints(event) {
        this.setState({plusPoints : event.target.value});
    }
    changeMinusPoints(event) {
        this.setState({minusPoints : event.target.value});
    }
  
    changeCategory(event) {
        event.preventDefault();
        console.log(" i " + event.target.value);
        this.setState({ category : event.target.value });
        let choosen = event.target.value;

        let question = Object.assign({}, this.state.question);    //creating copy of object
        question.category = choosen;                        //updating value
        this.setState({question });

        if (choosen === "EASY") {
            this.setState({
                plusPoints: 1.0
            })
        } else if (choosen === "MEDIUM") {
            this.setState({
                plusPoints: 2.0
            })
        } else if (choosen === "HARD") {
            this.setState({
                plusPoints: 3.0
            })
        }
    }

    handleChangeSelect(event) {
        this.setState({type : event.target.value});
    }


    render() {

        return (
        <Modal
            isOpen={this.props.questionInformationVisibility}
            contentLabel="Information"
            onRequestClose={this.props.closeQuestionInformation}
        >
        <div className="modal-header">
            <label className= "text-color">Informacije o pitanju </label>
            <button type="button"  className="close"  onClick={this.props.closeQuestionInformation} data-dismiss="modal">x</button>
        </div> 

        <div className = "containter" >
        <div className="row" >
        <div className="col-lg-6 modal-title-padding">
            <div className = "row">
                <div className =  "col-lg-6 form-group"> 
                    <label className= "text-color">Naziv pitanja:</label>
                    <input type="text" readOnly name="questionName" className="form-control form-control-lg" onChange={this.changeName}  value={this.state.name}/>
                </div>
                <div className = "col-lg-6 form-group"> 
                    <label className= "text-color">Tip pitanja:</label>
                    <select readOnly className="form-control form-control-lg "
                    name="questionType"
                    onChange={this.handleChangeSelect}
                    value = {this.state.type}
                    >
                    {this.state.options.map(opt => {
                    return (
                        <option
                            key={opt}
                            value={opt}
                            >{opt}</option>
                    );
                    })}
                </select>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 form-group">
                    <label className= "text-color">Tekst pitanja:</label>
                    <MyStatefulEditor canChange = {false} textOfEditor = {this.state.questionText} changeEditorState = {this.changeEditorState}/> 
                </div>
            </div>
            <div className="row">
                <div className="form-group col-lg-4">
                    <label className= "text-color">Kategorija težine:</label>
                     <select readOnly
                        className="form-control form-control-lg "
                        name="questionCategory"
                        onChange={this.changeCategory}
                        value = {this.state.category}
                        >
                        {this.state.categoryOptions.map(opt => {
                        return (
                            <option
                                key={opt}
                                value={opt}>
                                { this.renderCategory(opt)}
                                
                            </option>
                        );
                        })}
                    </select>
                </div>
                <div className="form-group col-lg-4">
                    <label className= "text-color">Bodovi </label><label className = "small_word"> - tačan odgovor</label>
                    <input  readOnly type="text" name="questionPlusPoints" className="form-control form-control-lg "  onChange={this.changePlusPoints}  value={this.state.plusPoints} />
                </div>
                <div className="form-group col-lg-4">
                    <label className= "text-color">Bodovi</label><label className = "small_word"> - netačan odgovor</label> 
                    <input readOnly type="text" name="questionMinusPoints" className="form-control form-control-lg"  onChange={this.changeMinusPoints}  value={this.state.minusPoints}  />
                </div>
            </div>              
        </div> {/*otvarajuci zatvr*/}
{/* ovdjeee */}
    <div className="col-lg-6 modal-title-padding"> {/* Odgovori */}
    <div><p className= "text-color"> Odgovori :</p>
        {this.renderTableWithAnswers()}</div>
    </div> 
    </div> {/* row */}
    
        </div>
        </Modal>

        );
    }
}
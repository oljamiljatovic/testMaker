import React from 'react';
import ReactDOM from 'react-dom';
import AddAnswer from './AddAnswer';
import Modal from 'react-modal';
import MyStatefulEditor from './MyStatefulEditor';
export default class AddQuestion extends React.Component {

    constructor(props) {
        super(props);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.changePlusPoints = this.changePlusPoints.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.renderCategory = this.renderCategory.bind(this);
        this.changeEditorState = this.changeEditorState.bind(this);
        this.changeMinusPoints = this.changeMinusPoints.bind(this);
        //this.changeName = this.changeName.bind(this);
      this.changeQuestionName = this.changeQuestionName.bind(this);
      

        this.state = {
            options: ['/c', '/u', '/t'], //T je jedan a C vise
            categoryOptions: [],
            checkBoxVisibility: false,
            inputAnswerVisibility: false,
            answerList: [],
            plusPoints: '',
            expand: false,
           questionText : '',
           question : {}
        };
    }

    componentDidMount() {
        var quizUrl = 'http://localhost:8080/categories';
        fetch(quizUrl, {
            mode: 'cors',
            method: "GET",
            response: true
        })
            .then(res => res.json())
            .then(data => this.setState({ categoryOptions: data }));

    }
    changePlusPoints(event) {
        this.setState({
            plusPoints: event.target.value
        })
    }
    changeMinusPoints(event) {
        let question = Object.assign({}, this.state.question);    //creating copy of object
        question.minusPoints = event.target.value;                        //updating value
        this.setState({question});
    }

    changeQuestionName(event){
        let question = Object.assign({}, this.state.question);    //creating copy of object
        question.name = event.target.value;                        //updating value
        this.setState({question});
    }
    handleChangeSelect(event) {
        let choosen = event.target.value;

      
        let question = Object.assign({}, this.state.question);    //creating copy of object
        question.type = choosen;                        //updating value
        this.setState({question});

   
        if (choosen === '/c') {
            console.log("c, need answers");
            this.setState({
                checkBoxVisibility: true,
                inputAnswerVisibility: true,
                expand: true
            })
        } else if (choosen === '/t') {
            console.log('/t');
            this.setState({
                checkBoxVisibility: true,
                inputAnswerVisibility: true,
                expand: true
            })
        } else if (choosen === '/u') {
            console.log('u');
            this.setState({
                checkBoxVisibility: false,
                inputAnswerVisibility: true,
                expand: true
            })
        }
    }
    changeCategory(event) {
        event.preventDefault();
        console.log(" i " + event.target.value);
        let choosen = event.target.value;


        let question = Object.assign({}, this.state.question);    //creating copy of object
        question.category = choosen;                        //updating value
        this.setState({question});

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

    addAnswer(answer) {
        var newArray = this.state.answerList.slice();
        newArray.push(answer);
        this.setState({ answerList: newArray });
    }

/*     addQuestion(e) {
        e.preventDefault();

        const question = {};
        question.name = e.target.elements.questionName.value;
        question.text = this.state.questionText;
        question.type = e.target.elements.questionType.value;
        question.category = e.target.elements.questionCategory.value;
        question.plusPoints = e.target.elements.questionPlusPoints.value;
        question.minusPoints = e.target.elements.questionMinusPoints.value;
        question.answerList = this.state.answerList;

        let sectionId = this.props.sectionId;

        const url = 'http://localhost:8080/addQuestion/' + sectionId;
        let fetchData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            response: true,
            body: JSON.stringify(question)

        }
        fetch(url, fetchData)
            .then(res => res.json())
            .then(data => this.setState({ answerList: [] }));



        e.target.elements.questionName.value = '';
        //e.target.elements.questionText.value = '';
        e.target.elements.questionType.value = '';
        e.target.elements.questionPlusPoints.value = '';
        e.target.elements.questionMinusPoints.value = '';
    } */

    addQuestion(){
        const question = {};
        question.name = this.state.question.name;
        question.text = this.state.questionText;
        question.type = this.state.question.type;
        question.category = this.state.question.category;

        question.plusPoints = this.state.plusPoints;
        question.minusPoints =this.state.question.minusPoints;

        question.answerList = this.state.answerList;
        let sectionId = this.props.sectionId; 

        const url = 'http://localhost:8080/addQuestion/' + sectionId;
        let fetchData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            response: true,
            body: JSON.stringify(question)

        }
        fetch(url, fetchData)
            .then(res => res.json())
            .then(data => this.setState({ answerList: [] }));



       // e.target.elements.questionName.value = '';
        //e.target.elements.questionText.value = '';
       // e.target.elements.questionType.value = '';
        //e.target.elements.questionPlusPoints.value = '';
       // e.target.elements.questionMinusPoints.value = '';
    }
    changeEditorState(editorText){
        this.setState({ questionText: editorText })
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
    renderAnswers() {
        return this.state.answerList.map(answer => (
            <tr key={answer.text}>
               {/*  <td>{answer.text}</td> */}
                <td>{answer.text.substring(0,15) + "..."}
                    <span className="spnTooltip"> {answer.text}
                    </span> 
                </td>
                <td>{answer.exactitude ? 'tačan' : 'netačan'}</td>
            </tr>
        ))
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

    render() {
    return (
    <Modal
        isOpen={this.props.canAddQuestionShow}
        contentLabel="Information"
        onRequestClose={this.props.closeAddQuestion}
    /*   className={this.state.expand !== true ? 'create-question ' : 'create-question-expand'} */
    >
    <div className="modal-header">
        <label className= "text-color">Dodavanje novog pitanja </label>
        <button type="button" className="close"  onClick={this.props.closeAddQuestion}>x</button>
    </div> 
    <div className = "containter" >
        <div className="row" >
            <div className={this.state.expand !== true ? 'offset-lg-3 col-lg-6 modal-title-padding ' : 'col-lg-6 modal-title-padding '}>
               <div className = "row">
                    <div className =  "col-lg-6 form-group"> 
                        <label className= "text-color">Naziv pitanja:</label>
                        <input type="text" name="questionName" className="form-control form-control-lg" 
                        onBlur={this.changeQuestionName} />
                    </div>
                    <div className = "col-lg-6 form-group"> 
                        <label className= "text-color">Tip pitanja:</label>
                        <select className="form-control form-control-lg "
                            name="questionType"
                            onChange={this.handleChangeSelect} >
                            {this.state.options.map(opt => {
                            return (
                                <option
                                    key={opt}
                                    value={opt}>{opt}</option>
                            );
                            })}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 form-group">
                        <label className= "text-color">Tekst pitanja:</label>
                        <MyStatefulEditor canChange = {true} changeEditorState = {this.changeEditorState}/> 
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-lg-4">
                        <label className= "text-color">Kategorija težine:</label>
                        <select
                            className="form-control form-control-lg "
                            name="questionCategory"
                            onChange={this.changeCategory} >
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
                        <input type="text" name="questionPlusPoints" className="form-control form-control-lg " value={this.state.plusPoints} onChange={this.changePlusPoints} />
                    </div>
                    <div className="form-group col-lg-4">
                        <label className= "text-color">Bodovi</label><label className = "small_word"> - netačan odgovor</label>
                        <input type="text" name="questionMinusPoints" className="form-control form-control-lg" onBlur={this.changeMinusPoints} />
                    </div>
                </div>              
            </div> {/*otvarajuci zatvr*/}

        <div className="col-lg-6 modal-title-padding"> {/* Odgovori */}
            {this.state.checkBoxVisibility && <div><p className= "text-color"> Odgovori :</p>
            {this.renderTableWithAnswers()}</div>}
            {this.state.inputAnswerVisibility && this.state.checkBoxVisibility && <div className = "offset-lg-1 col-lg-10">
            <AddAnswer  renderExactitude={true} addAnswer={this.addAnswer} /> </div>}

            {!this.state.checkBoxVisibility && this.state.inputAnswerVisibility && 
            <div  >
                <AddAnswer renderExactitude={false} addAnswer={this.addAnswer} />
            </div>}
        </div> 
     </div> {/* row */}
       
    
        <div className="row  ">
            <div className={this.state.inputAnswerVisibility !== true ? 'offset-lg-3 col-lg-6 bottom ':'offset-lg-3 col-lg-6 bottom'}>
               {/*  <button onClick={this.addQuestion}  className='rounded-button btn button-primary-color '>Dodaj pitanje</button> */}
                <button 
               className="btn button-primary-color btn-lg btn-block block " onClick={this.addQuestion} >Dodaj pitanje </button>
               </div>
        </div>
    </div>{/*  containter  */}
            </Modal >
        );
    }
}
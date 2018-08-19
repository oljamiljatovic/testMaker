import React from 'react';
import ReactDOM from 'react-dom';
import AddAnswer from './AddAnswer';
import Modal from 'react-modal';
export default class AddQuestion extends React.Component {

    constructor(props) {
        super(props);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.changePlusPoints = this.changePlusPoints.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.state = {
            options: ['/c', '/u', '/t'], //T je jedan a C vise
            categoryOptions: [],
            checkBoxVisibility: false,
            inputAnswerVisibility: false,
            answerList: [],
            plusPoints: ''
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
    handleChangeSelect(event) {
        let choosen = event.target.value;
        if (choosen === '/c') {
            console.log("c, need answers");
            this.setState({
                checkBoxVisibility: true,
                inputAnswerVisibility: false
            })
        } else if (choosen === '/t') {
            console.log('/t');
            this.setState({
                checkBoxVisibility: true,
                inputAnswerVisibility: false
            })
        } else if (choosen === '/u') {
            console.log('u');
            this.setState({
                checkBoxVisibility: false,
                inputAnswerVisibility: true
            })
        }
    }
    changeCategory(event) {
        event.preventDefault();
        console.log(" i " + event.target.value);
        let choosen = event.target.value;
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

    addQuestion(e) {
        e.preventDefault();

        const question = {};
        question.name = e.target.elements.questionName.value;
        question.text = e.target.elements.questionText.value;
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
        e.target.elements.questionText.value = '';
        e.target.elements.questionType.value = '';
        e.target.elements.questionPlusPoints.value = '';
        e.target.elements.questionMinusPoints.value = '';
    }

    renderAnswers() {
        return this.state.answerList.map(answer => (
            <tr key={answer.text}>
                <td>{answer.text}</td>
                <td>{answer.exactitude ? 'tacan' : 'netacan'}</td>
            </tr>
        ))
    }
    renderTableWithAnswers() {
        return (
            <div className="scroll-answers">
                <table className="table table-hover table-centered" >
                    <thead className="thead-light">
                        <tr >
                            <th>Text</th>
                            <th>Exactitude</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.renderAnswers()}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        return (
            <Modal
                isOpen={this.props.canAddQuestionShow}
                contentLabel="Information"
                onRequestClose={this.props.closeAddQuestion}
            >
                <div >
                    <div className="row" >
                        <div className="offset-lg-2 col-lg-4 ">
                        
                            <form onSubmit={this.addQuestion} >

                                <div className="row">
                                    <div className="form-group col-lg-5">
                                        <label>Naziv pitanja:</label>
                                        <input type="text" name="questionName" className="form-control form-control-lg " />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-lg-5">
                                        <label>Tekst pitanja:</label>
                                        <textarea name="questionText" className="form-control " rows="5" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-lg-5">
                                        <label>Tip pitanja:</label>
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
                                    <div className="form-group col-lg-5">
                                        <label>Kategorija tezine:</label>
                                        <select
                                            className="form-control form-control-lg "
                                            name="questionCategory"
                                            onChange={this.changeCategory} >

                                            {this.state.categoryOptions.map(opt => {
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
                                    <div className="form-group col-lg-5">
                                        <label>Broj bodova za tacan odgovor:  :</label>
                                        <input type="text" name="questionPlusPoints" className="form-control form-control-lg " value={this.state.plusPoints} onChange={this.changePlusPoints} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col-lg-5">
                                        <label>Broj bodova za netacan odgovor:</label>
                                        <input type="text" name="questionMinusPoints" className="form-control form-control-lg" />
                                    </div>
                                </div>
                                <div className="row">
                                    <button className="btn btn-primary">Dodaj</button>
                                </div>
                            </form>
                         
                        </div>
                        <div className="col-lg-6">

                            {this.state.checkBoxVisibility && <div  ><p> Answers right here</p>
                                {this.renderTableWithAnswers()}
                                <AddAnswer renderExactitude={true} addAnswer={this.addAnswer} /></div>}

                            {this.state.inputAnswerVisibility && <AddAnswer renderExactitude={false} addAnswer={this.addAnswer} />}
                        </div>


                    </div>

                    <button onClick={this.props.closeAddQuestion} >Close </button>
                </div>
            </Modal>
        );
    }
}
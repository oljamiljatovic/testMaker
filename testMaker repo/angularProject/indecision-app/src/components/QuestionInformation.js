import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

export default class QuestionInformation extends React.Component {

    constructor(props) {
        super(props);
        this.openChangeQuestionDiv = this.openChangeQuestionDiv.bind(this);
        this.changeQuestion = this.changeQuestion.bind(this);
        this.changeAnswer = this.changeAnswer.bind(this);
        this.openChangeAnswerDiv = this.openChangeAnswerDiv.bind(this);
        this.getAnswersForQuestion = this.getAnswersForQuestion.bind(this);
        this.state = {
            questionId: this.props.questionId,
            informationVisibility: this.props.informationVisibility,
            answerVisibility: false,
            question: {},
            changeQuestionDivVisibility: false,
            answerId: -1,
            answer: {},
            expand: false

        };
    }

    openChangeQuestionDiv() {
        this.setState({
            changeQuestionDivVisibility: true,
            expand: true,
            changeAnswerDivVisibility: false
        });

    }

    openChangeAnswerDiv(answerId) {
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
    }
    changeQuestion(e) {
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


    }

    changeAnswer(e) {
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
    }

    getAnswersForQuestion() {
        console.log(this.state.question.answerList);

        this.setState({
            answerVisibility: true,
            expand: true
        })
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
                    changeQuestionDivVisibility: false
                }));
            // nextProps.myProp has a different value than our current prop
            // so we can perform some calculations based on the new value
        }
    }

    renderAnswers() {
        return this.state.question.answerList.map(answer => (
            <tr key={answer.id}>
                <td>{answer.id}</td>
                <td>{answer.text}</td>
                <td>{answer.exactitude ? 'tacan odgovor' : 'netacan odgovor'}</td>

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
                isOpen={this.props.questionInformationVisibility}
                contentLabel="Information"
                onRequestClose={this.props.closeQuestionInformation}
                /*    className="modalInformation" */
                className={this.state.expand !== true ? 'modalInformation ' : 'modal-background'}

            >

                <div className="row " >
                    <div className={this.state.answerVisibility !== true ? 'col-lg-12 form-padding  ' : 'col-lg-6 form-padding '} >

                        <form  >
                            <div className="row">
                                <div className="form-group offset-lg-3 col-lg-6 offset-lg-3">
                                    <label>Naziv:</label>
                                    <label className="form-control form-control-lg"> {this.state.question.name}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group offset-lg-3 col-lg-6 offset-lg-3">
                                    <label>Tekst pitanja:</label>
                                    <label className="form-control form-control-lg"> {this.state.question.text}</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group offset-lg-3 col-lg-6 offset-lg-3">
                                    <button type="button" onClick={this.openChangeQuestionDiv} >Promijeni </button>
                                    {this.state.question.type === '/c' && <button type="button" onClick={this.getAnswersForQuestion}>Odgovori </button>}
                                </div>
                            </div>

                        </form>



                    </div>

                    {this.state.answerVisibility && <div className="col-lg-6 answer-padding">
                        <div className="row">
                            <div className="form-group offset-lg-2 col-lg-8 offset-lg-2 scroll-answers">
                                <table className="table table-hover table-centered">
                                    <thead className="thead-light">
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
                            </div>
                        </div>
                    </div>}
                </div>


                <div className="row ">


                    {this.state.changeQuestionDivVisibility &&
                        <div className='offset-lg-3 col-lg-6  offset-lg-3 answer-padding '>
                            <form onSubmit={this.changeQuestion}>

                                <div className="row">
                                    <div className="form-group offset-lg-3 col-lg-6 offset-lg-3">
                                        <label>Naziv pitanja:</label>
                                        <input type="text" name="questionName" className="form-control form-control-lg " defaultValue={this.state.question.name} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group offset-lg-3 col-lg-6 offset-lg-3">
                                        <label>Tekst pitanja:</label>
                                        <input type="text" name="questionText" defaultValue={this.state.question.text} className="form-control form-control-lg " defaultValue={this.state.question.name} />
                                    </div>
                                </div>
                                <input type="hidden" name="questionId" defaultValue={this.state.question.id} />
                                <input type="hidden" name="questionType" defaultValue={this.state.question.type} />
                                <div className="row">
                                    <div className="form-group offset-lg-7 col-lg-5">
                                        <button className="btn btn-primary form-control-lg">Promijeni</button>
                                    </div>
                                </div>

                            </form>
                        </div>}



                    {this.state.changeAnswerDivVisibility &&
                        <div className='offset-lg-3 col-lg-6  offset-lg-3 answer-padding '>

                            <form onSubmit={this.changeAnswer}>
                                <input type="hidden" name="questionInAnswerId" defaultValue={this.state.question.id} />
                                <input type="hidden" name="answerId" defaultValue={this.state.answer.id} />
                                <div className="row">
                                    <div className="form-group offset-lg-3 col-lg-6 offset-lg-3">
                                        <label>Tacnost :</label>
                                        <input type="text" name="answerExactitude" className="form-control form-control-lg " defaultValue={this.state.answer.exactitude} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group offset-lg-3 col-lg-6 offset-lg-3">
                                        <label>Tekst :</label>
                                        <input type="text" name="answerText" className="form-control form-control-lg " defaultValue={this.state.answer.text} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group offset-lg-7 col-lg-5">
                                        <button className="btn btn-primary">Promijeni</button>
                                    </div>
                                </div>
                            </form>

                        </div>}

                </div>
                <div className="row ">
            <div className=" offset-lg-10 col-lg-2 close-bottom  ">
              <button onClick={this.props.closeQuestionInformation} className="btn btn-primary" >Close </button>
            </div>
          </div>


            </Modal>

        );
    }
}
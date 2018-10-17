import React from 'react';
import ReactDOM from 'react-dom';
import AddSubject from './addSubject';
import SectionList from './SectionList';
import Header from './Header';
import QuestionInformation from './QuestionInformation';
export default class TestList extends React.Component {

    constructor(props) {
        super(props);
        this.testsForSubject = this.testsForSubject.bind(this);
        this.questionsForTest = this.questionsForTest.bind(this);
        this.informationAboutQuestion = this.informationAboutQuestion.bind(this);
        this.closeQuestionInformation = this.closeQuestionInformation.bind(this);
        this.export = this.export.bind(this);
        this.state = {
            subjectList: [],
            testList: [],
            questionList: [],
            testsVisibility: false,
            questionsVisibility: false,
            questionInformationVisibility: false,
            questionId: ''
        };
    }

    testsForSubject(subjectId) {

        var quizUrl = 'http://localhost:8080/getTestsForSubject/' + subjectId;
        fetch(quizUrl, {
            mode: 'cors',
            method: "PUT",
            response: true
        })
            .then(res => res.json())
            .then(data => this.setState({
                testList: data,
                testsVisibility: true
            }));
    }

    questionsForTest(testId) {

        var quizUrl = 'http://localhost:8080/questionsForTest/' + testId;
        fetch(quizUrl, {
            mode: 'cors',
            method: "PUT",
            response: true
        })
            .then(res => res.json())
            .then(data => this.setState({
                questionList: data,
                questionsVisibility: true
            }));
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

    export(testId) {
        var quizUrl = 'http://localhost:8080/exportTest/' + testId;
        fetch(quizUrl, {
            mode: 'cors',
            method: "PUT",
            response: true
        })
            .then(res => res.json())
            .then(data => console.log("test id" + data.id));
    }


    componentDidMount() {
        var quizUrl = 'http://localhost:8080/subjectList';
        fetch(quizUrl, {
            mode: 'cors',
            method: "GET",
            response: true
        })
            .then(res => res.json())
            .then(data => this.setState({ subjectList: data }));
    }

    renderSubjects() {
        return this.state.subjectList.map(subject => (
            <tr key={subject.id}>
                <td>{subject.id}</td>
                <td>{subject.name}</td>
                <td>{subject.label}</td>
                <td>
                    <input type="button" className="btn rounded-button button-primary-color" value="Testovi"
                        onClick={(e) => {
                            this.testsForSubject(subject.id);
                        }} />
                </td>
            </tr>
        ))
    }
    renderTests() {
        return this.state.testList.map(test => (
            <tr key={test.id}>
                <td>{test.name}</td>
                <td>{test.label}</td>
                <td>{test.questionList.length}</td>
                <td>
                    <input type="button" className="btn rounded-button button-primary-color" value="Pitanja iz testa"
                        onClick={(e) => {
                            this.questionsForTest(test.id);
                        }} />
                </td>
                <td>
                    <input type="button" className="btn rounded-button button-secondary-color" value="Export u fajl"
                        onClick={(e) => {
                            this.export(test.id);
                        }} />
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
                    <input type="button" className = "btn rounded-button button-primary-color" value="Informacije"
                        onClick={(e) => {
                            this.informationAboutQuestion(question.id);
                        }} />
                </td>
            </tr>
        ))
    }


    render() {

        return (
            <div>
                <Header activeLink="testList" />

                <div className="row  modal-title-padding">
                    <div className="offset-lg-3 col-lg-6 offset-lg-3">
                        <table className="table table-hover table-centered">
                            <thead >
                                <tr >
                                    <th>Rbr</th>
                                    <th>Naziv predmeta</th>
                                    <th>&nbsp; </th>
                                    <th>&nbsp; </th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.renderSubjects()}
                            </tbody>
                        </table>

                    </div>
                </div>
                <div className="row form-padding">
                    <div className="offset-lg-1 col-lg-6">
                        {this.state.testsVisibility && <table className=" table table-hover table-centered" >
                            <thead >
                                <tr >
                                    <th>Naziv</th>
                                    <th>Oznaka </th>
                                    <th>Broj pitanja </th>
                                    <th>&nbsp; </th>
                                    <th>&nbsp; </th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.renderTests()}
                            </tbody>
                        </table>
                        }
                    </div>

                    <div className="col-lg-4 ">
                        {this.state.questionsVisibility && <table className=" table table-hover table-centered" >
                            <thead >
                                <tr >
                                    <th>Rbr</th>
                                    <th>Naziv</th>
                                    <th>Oznaka</th>
                                    <th>&nbsp; </th>

                                </tr>
                            </thead>

                            <tbody>
                                {this.renderQuestions()}
                            </tbody>
                        </table>
                        }
                    </div>
                </div>
                <QuestionInformation
                    questionId={this.state.questionId}
                    questionInformationVisibility={this.state.questionInformationVisibility}
                    closeQuestionInformation={this.closeQuestionInformation}
                />

            </div>
        );
    }

}
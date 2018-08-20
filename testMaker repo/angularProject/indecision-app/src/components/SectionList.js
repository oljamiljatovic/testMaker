import React from 'react';
import ReactDOM from 'react-dom';
import AddSectionForSubject from './AddSectionForSubject';
import QuestionList from './QuestionList';
import AddQuestion from './AddQuestion';
//import AddSubject from './AddSubject';
import QuestionsForTest from './QuestionsForTest';
export default class SectionList extends React.Component {

    constructor(props) {
        super(props);
        this.handleAddSectionForSubject = this.handleAddSectionForSubject.bind(this);
        this.questionsForSection = this.questionsForSection.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.openAddSection = this.openAddSection.bind(this);
        this.closeAddSection = this.closeAddSection.bind(this);
        this.closeAddQuestion = this.closeAddQuestion.bind(this);
        //this.optionsForSubject = this.optionsForSubject.bind(this);
        this.state = {
            sectionList: [],
            canQuestionsShow: false,
            canAddSectionShow: false,
            sectionId: -1,
            subject: this.props.subject,
            canAddQuestionShow: false
        };
    }
    handleAddSectionForSubject(addedSection) {
        var newArray = this.state.sectionList.slice();
        newArray.push(addedSection);
        this.setState({ sectionList: newArray })
    }


    questionsForSection(sectionId) {

        this.setState({
            canQuestionsShow: true,
            sectionId: sectionId

        })
        if (this.props.selectedSection != null) {
            this.props.selectedSection(sectionId);
        }
    }

    addQuestion(sectionId) {
        /*  this.setState({
             sectionId: sectionId
 
         }) */
        this.setState({
            sectionId: sectionId,
            canAddQuestionShow: true,
            canQuestionsShow: false


        })
    }

    openAddSection() {
        this.setState({
            canAddSectionShow: true
        })
    }

    closeAddSection = () => {
        this.setState(() => ({ canAddSectionShow: false }))
    }
    componentDidMount() {

        var quizUrl = 'http://localhost:8080/subjectList/' + this.props.subject.id;
        fetch(quizUrl, {
            mode: 'cors',
            method: "PUT",
            response: true
        })
            .then(res => res.json())
            .then(data => this.setState({
                sectionList: data,
                subject: this.props.subject
            }));

    }
    closeAddQuestion() {
        this.setState(() => ({ canAddQuestionShow: false }))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.subject.id !== this.props.subject.id) {
            var quizUrl = 'http://localhost:8080/subjectList/' + nextProps.subject.id;
            fetch(quizUrl, {
                mode: 'cors',
                method: "PUT",
                response: true
            })
                .then(res => res.json())
                .then(data => this.setState({
                    sectionList: data,
                    subject: nextProps.subject
                }));
        }
    }

    renderSections() {
        return this.state.sectionList.map(section => (
            <tr key={section.id}>
                <td>{section.id}</td>
                <td>{section.name}</td>
                <td>
                    <input type="button" value="Pitanja iz oblasti"
                        onClick={(e) => {
                            this.questionsForSection(section.id);
                        }} />
                </td>
                <td>
                    <input type="button" value="Kreiraj pitanje"
                        onClick={(e) => {
                            this.addQuestion(section.id);
                        }} />
                </td>
            </tr>
        ))
    }


    render() {

        return (

            <div id="prviUSection"
                className={this.props.isCreateTest !== true ? 'row ' : 'col-lg-6'}>

                <div
                    className={this.props.isCreateTest !== true ? 'col-lg-6  scroll-div ' : 'scroll-div'}>
                    {this.props.isCreateTest &&
                        <label>Oblasti </label>
                    }
                    <table className="table table-hover table-centered" >
                        <thead className="thead-light">
                            <tr >
                                <th>ID</th>
                                <th>Name</th>
                                <th>&nbsp; </th>
                                <th>&nbsp; </th>
                            </tr>
                        </thead>
                        <tbody >
                            {this.renderSections()}
                        </tbody>
                    </table>

                    <button onClick={(e) => {
                        this.openAddSection();
                    }}>Dodaj oblast</button>

                    <AddSectionForSubject
                        subjectId={this.state.subject.id}
                        canAddSectionShow={this.state.canAddSectionShow}
                        closeAddSection={this.closeAddSection}
                        handleAddSectionForSubject={this.handleAddSectionForSubject} />

                </div>
                <div
                    className={this.props.isCreateTest !== true ? 'col-lg-6  ' : 'row '}>
                    {this.state.canQuestionsShow && !this.props.isCreateTest && <QuestionList sectionId={this.state.sectionId} />}

                </div>
                <AddQuestion
                    sectionId={this.state.sectionId}
                    canAddQuestionShow={this.state.canAddQuestionShow}
                    closeAddQuestion={this.closeAddQuestion}
                           /*  handleAddSectionForSubject={this.handleAddSectionForSubject} */ />


                {/*    {this.props.isCreateTest && <QuestionsForTest getQuestions={this.props.getQuestions} sectionId={this.state.sectionId} />} */}



            </div>


        );
    }



}
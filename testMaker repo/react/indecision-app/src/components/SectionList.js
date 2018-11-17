import React from 'react';
import ReactDOM from 'react-dom';
import AddSectionForSubject from './AddSectionForSubject';
import QuestionList from './QuestionList';
import AddQuestion from './AddQuestion';
export default class SectionList extends React.Component {

    constructor(props) {
        super(props);
        this.handleAddSectionForSubject = this.handleAddSectionForSubject.bind(this);
        this.questionsForSection = this.questionsForSection.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.openAddSection = this.openAddSection.bind(this);
        this.closeAddSection = this.closeAddSection.bind(this);
        this.closeAddQuestion = this.closeAddQuestion.bind(this);
        this.state = {
            sectionList: [],
            canQuestionsShow: false,
            canAddSectionShow: false,
            sectionId: -1,
            subject: this.props.subject,
            canAddQuestionShow: false
        };
    }

    componentDidMount() {
        var subjectID = localStorage.getItem('subjectID');
        var quizUrl = 'http://localhost:8080/subjectList/' + subjectID;
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
    questionsForSection(sectionId) {
        this.setState({
            canQuestionsShow: true,
            sectionId: sectionId
        })
        if (this.props.selectedSection != null) {
            this.props.selectedSection(sectionId);
        }
    }
    handleAddSectionForSubject(addedSection) {
        var newArray = this.state.sectionList.slice();
        newArray.push(addedSection);
        this.setState({
            sectionList: newArray,
            canAddSectionShow: false
        })
    }

    addQuestion(sectionId) {
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

    closeAddQuestion() {
        this.setState(() => ({ canAddQuestionShow: false }))
    }

   
    renderSections() {
        return this.state.sectionList.map(section => (
            <tr key={section.id}>
                <td>{section.name}</td>
                <td>
                    <button type="button" className="fa fa-list-ol"
                        onClick={(e) => {
                            this.questionsForSection(section.id);
                    }} />
                    <button type="button" className="fa fa-plus"
                        onClick={(e) => {
                            this.addQuestion(section.id);
                     }} />
                </td>
            </tr>
        ))
    }


    render() {

        return (
            <div className={this.props.isCreateTest !== true ? 'row form-padding2 ' : 'col-lg-6 '}>
                <div className={this.props.isCreateTest !== true ? 'col-lg-5  ' : ''}>
                    {this.props.isCreateTest &&
                        <label className="text-color-bold">Oblasti </label>
                    }
                    <table className="table table-hover section-table" >
                        <thead >
                            <tr >
                                <th>Naziv oblasti</th>
                                <th>&nbsp; </th>
                            </tr>
                        </thead>
                        <tbody >
                            {this.renderSections()}
                        </tbody>
                    </table>
                    {!this.props.isCreateTest && <button className="rounded-button btn button-primary-color" onClick={(e) => {
                        this.openAddSection();
                    }}>Dodaj oblast</button>}
                </div>

 {/*Dodavanje sekcije(DIJALOG) za HOME */}
                <AddSectionForSubject
                    subjectId={this.state.subject.id}
                    canAddSectionShow={this.state.canAddSectionShow}
                    closeAddSection={this.closeAddSection}
                    handleAddSectionForSubject={this.handleAddSectionForSubject} />
{/*Prikaz pitanja za HOME */}
                <div
                    className={this.props.isCreateTest !== true ? 'col-lg-6  ' : 'row '}>
                    {this.state.canQuestionsShow && !this.props.isCreateTest && <QuestionList sectionId={this.state.sectionId} />}

                </div>
{/*Dodavanje pitanja(DIJALOG) za HOME */}
                <AddQuestion
                    sectionId={this.state.sectionId}
                    canAddQuestionShow={this.state.canAddQuestionShow}
                    closeAddQuestion={this.closeAddQuestion}
                />
            </div>


        );
    }



}
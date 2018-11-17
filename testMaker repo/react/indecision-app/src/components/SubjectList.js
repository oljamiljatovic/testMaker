import React from 'react';
import ReactDOM from 'react-dom';
import AddSubject from './addSubject';
import SectionList from './SectionList';
import QuestionsForTest from './QuestionsForTest';
import ChooseSubject from './ChooseSubject';
export default class SubjectList extends React.Component {

    constructor(props) {
        super(props);
        this.handleAddSubject = this.handleAddSubject.bind(this);
        this.optionsForSubject = this.optionsForSubject.bind(this);
        this.selectedSection = this.selectedSection.bind(this);
        this.closeAddSubject = this.closeAddSubject.bind(this);
        this.handleAddSubject = this.handleAddSubject.bind(this);
        this.closeChooseSubject = this.closeChooseSubject.bind(this);
        this.state = {
            subjectList: [],
            canSectionsShow: false,
            subjectId: -1,
            subject: {},
            sectionId: -1,
            canShowQuestionForTest: false,
            canAddSubjectShow: false,
            chooseSubjectVisibility: true
        };
    }

    componentDidMount() {
        if (this.props.isCreateTest != null) {
            if (this.props.isCreateTest == true) {
                this.setState({
                    chooseSubjectVisibility: false,
                    canSectionsShow: true
                })
            }
        }
    }
    optionsForSubject(subject) {
        if (this.props.choosenSubject != null) {
            this.props.choosenSubject(subject.id);
        }

        this.setState({
            canSectionsShow: true,
            subjectId: subject.id,
            subject: subject
        })
    }
    handleAddSubject(addedSubject) {
        //treba dodati na back
        var newArray = this.state.subjectList.slice();
        newArray.push(addedSubject);
        this.setState({
            subjectList: newArray,
            canAddSubjectShow: false
        })
    }


    openAddSubject() {
        this.setState({
            canAddSubjectShow: true
        })
    }
    closeAddSubject() {
        this.setState({
            canAddSubjectShow: false
        })
    }
    selectedSection(sectionId) {
        this.setState({
            sectionId: sectionId,
            canShowQuestionForTest: true
        })
    }

    closeChooseSubject(choosenSubject) {
        this.setState({
            chooseSubjectVisibility: false,
            subject: choosenSubject,
            subjectId: choosenSubject.id,
            canSectionsShow: true
        })
        localStorage.setItem('subjectID', choosenSubject.id);
    }



    render() {
        return (
            <div className="container">
                <div className="row padding-right-test">
                    <ChooseSubject
                        chooseSubjectVisibility={this.state.chooseSubjectVisibility}
                        closeChooseSubject={this.closeChooseSubject}
                    />
                    
                    {!this.props.isCreateTest && <div> <button className="margin-left-button-15 rounded-button btn  button-primary-color " onClick={(e) => {
                        this.openAddSubject();
                    }}>Dodaj predmet</button> </div>}

{/* Sekcije za Kreiraj test */}
                    {this.state.canSectionsShow && this.props.isCreateTest &&
                        <SectionList subject={this.state.subject} isCreateTest={this.props.isCreateTest} subjectId={this.state.subjectId}
                            getQuestions={this.props.getQuestions} selectedSection={this.selectedSection} />
                    }
                </div>

{/* Sekcije za HOME */}
                {this.state.canSectionsShow && !this.props.isCreateTest &&
                    <SectionList subject={this.state.subject} isCreateTest={this.props.isCreateTest} subjectId={this.state.subjectId}
                        getQuestions={this.props.getQuestions} />
                }  

{/* Pitanja za Kreiraj test */}              
                {this.state.canShowQuestionForTest &&
                    <div className="row">
                        <div className="col-lg-12">
                            {this.props.isCreateTest && <QuestionsForTest getQuestions={this.props.getQuestions} sectionId={this.state.sectionId} />}
                        </div>
                    </div>}

                <AddSubject
                    canAddSubjectShow={this.state.canAddSubjectShow}
                    closeAddSubject={this.closeAddSubject}
                    handleAddSubject={this.handleAddSubject} />
            </div>
        );
    }

}
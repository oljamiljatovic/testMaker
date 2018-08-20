import React from 'react';
import ReactDOM from 'react-dom';
import AddSubject from './addSubject';
import SectionList from './SectionList';
import QuestionsForTest from './QuestionsForTest';
export default class SubjectList extends React.Component {

    constructor(props) {
        super(props);
        this.handleAddSubject = this.handleAddSubject.bind(this);
        this.optionsForSubject = this.optionsForSubject.bind(this);
        this.selectedSection = this.selectedSection.bind(this);
        this.state = {
            subjectList: [],
            canSectionsShow: false,
            subjectId: -1,
            subject: {},
            sectionId: -1,
            canShowQuestionForTest: false
        };
    }
    handleAddSubject(addedSubject) {
        var newArray = this.state.subjectList.slice();
        newArray.push(addedSubject);
        this.setState({ subjectList: newArray })
    }


    optionsForSubject(subject) {
        if(this.props.choosenSubject != null){
            this.props.choosenSubject(subject.id);
        }
      
        this.setState({
            canSectionsShow: true,
            subjectId: subject.id,
            subject: subject
        })

        //.then(data => this.props.history.push('/sectionList'));
    }

    selectedSection(sectionId) {
        this.setState({
            sectionId: sectionId,
            canShowQuestionForTest: true
        })
    }


    componentDidMount() {
        var quizUrl = 'http://localhost:8080/subjectList';
        fetch(quizUrl, {
            mode: 'cors',
            method: "GET",
            response: true
        }).then(res => res.json())
            .then(data => this.setState({ subjectList: data }));
    }


    renderSubjects() {
        return this.state.subjectList.map(subject => (
            <tr key={subject.id}>
                <td>{subject.id}</td>
                <td>{subject.name}</td>
                <td>

                    <input type="button" value="Oblasti"
                        onClick={(e) => {
                            this.optionsForSubject(subject);
                        }} />
                </td>
            </tr>
        ))
    }


    render() {

        return (

            <div className="container">
                <div className="row padding-right-test">
                    <div
                        className={this.props.isCreateTest !== true ? 'col-lg-12 scroll-subject ' : 'col-lg-6 scroll-subject'}>
                        {this.props.isCreateTest &&
                            <label>Predmeti </label>
                        }
                        <table className="table table-hover table-centered" >
                            <thead className="thead-light">
                                <tr >
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Akcije </th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.renderSubjects()}
                            </tbody>
                        </table>
                    </div>

                    {this.state.canSectionsShow && this.props.isCreateTest &&


                        <SectionList subject={this.state.subject} isCreateTest={this.props.isCreateTest} subjectId={this.state.subjectId}
                            getQuestions={this.props.getQuestions} selectedSection={this.selectedSection} />

                    }
                </div>

                {this.state.canSectionsShow && !this.props.isCreateTest &&
                    <SectionList subject={this.state.subject} isCreateTest={this.props.isCreateTest} subjectId={this.state.subjectId}
                        getQuestions={this.props.getQuestions} />
                }


                {this.state.canShowQuestionForTest &&
                    <div className="row">
                        <div className="col-lg-12">
                            {this.props.isCreateTest && <QuestionsForTest getQuestions={this.props.getQuestions} sectionId={this.state.sectionId} />}
                        </div>
                    </div>}

            </div>


            /*  

                {this.props.canAddSubjectShow && <div>
                    <h2>Novi predmet : </h2>
                    <AddSubject handleAddSubject={this.handleAddSubject} />
                </div>}
            </div>
          */

        );
    }

}
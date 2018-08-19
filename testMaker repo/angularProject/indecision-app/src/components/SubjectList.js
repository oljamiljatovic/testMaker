import React from 'react';
import ReactDOM from 'react-dom';
import AddSubject from './addSubject';
import SectionList from './SectionList';
export default class SubjectList extends React.Component {

    constructor(props) {
        super(props);
        this.handleAddSubject = this.handleAddSubject.bind(this);
        this.optionsForSubject = this.optionsForSubject.bind(this);
        this.state = {
            subjectList: [],
            canSectionsShow: false,
            subjectId: -1,
            subject: {}
        };
    }
    handleAddSubject(addedSubject) {
        var newArray = this.state.subjectList.slice();
        newArray.push(addedSubject);
        this.setState({ subjectList: newArray })
    }


    optionsForSubject(subject) {
        this.setState({
            canSectionsShow: true,
            subjectId: subject.id,
            subject: subject
        })

        //.then(data => this.props.history.push('/sectionList'));
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
                <div className="row">
                    <div className="col-lg-12 scroll-subject">
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
                        </table></div>
                </div>
                <br/>
                <div className="row">
                    {this.state.canSectionsShow && 
                    <div className="col-lg-12"> 
                        <h3> Oblasti za predmet "{this.state.subject.name}": </h3>
                         <SectionList subject={this.state.subject} isCreateTest={this.props.isCreateTest} subjectId={this.state.subjectId}
                        getQuestions={this.props.getQuestions} /> 
                    </div>
                    } 
                    
                </div>
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
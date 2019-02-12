import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
export default class SubjectList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subjectList: []
        };
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

                    <input type="button" className= "rounded-button btn button-primary-color" value="Odaberi"
                        onClick={(e) => {
                            this.props.closeChooseSubject(subject);
                        }} />
                </td>
            </tr>
        ))
    }

    
    render() {

        return (
            <Modal
                isOpen ={this.props.chooseSubjectVisibility}
                contentLabel="Choose subject"
                onRequestClose={this.props.closeChooseSubject}
            >
            <div className="modal-header">
                <label className= "text-color">Odaberite predmet </label>
                <button type="button" className="close"  onClick={this.props.closeChooseSubject}>x</button>
            </div> 
<div className="container">
                <div className="row row-margin-top">
                    <div
                        className={this.props.isCreateTest !== true ? 'offset-lg-2 col-lg-8 offset-lg-2 ' : 'col-lg-6 '}>
                        {this.props.isCreateTest &&
                            <label className= "text-color-bold">Predmeti </label>
                        }
                        <table className="table table-hover table-centered " >
                            <thead>
                                <tr>
                                    <th>Rbr</th>
                                    <th>Naziv predmeta</th>
                                    <th>&nbsp; </th>
                                </tr>
                            </thead>

                            <tbody >
                                {this.renderSubjects()}
                            </tbody>
                        </table>
                    </div>
                  
                </div>
</div>
            </Modal>

        );
    }
}
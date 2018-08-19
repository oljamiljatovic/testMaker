import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
export default class AddSectionForSubject extends React.Component{

    constructor(props) {
        super(props);
        this.handleAddSectionForSubject = this.handleAddSectionForSubject.bind(this);
        this.state = {
          subjectId : props.subjectId
        };
      }

      componentWillReceiveProps(nextProps) {
        if (nextProps.subjectId !== this.props.subjectId) {
           this.setState({
                      subjectId : nextProps.subjectId
                })
        }
    }


      handleAddSectionForSubject(e) {
        e.preventDefault();
        const sectionName = e.target.elements.sectionName.value.trim();
        const subjectId = e.target.elements.subjectId.value;
        
        const url = 'http://localhost:8080/addSectionForSubject/'+subjectId;
        let data = {
            id : null,
            name : sectionName
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
        .then(data => this.props.handleAddSectionForSubject(data) );
   
      }
      render() {
        
        return (
          <Modal
          isOpen = {this.props.canAddSectionShow}
          contentLabel = "Information"
          onRequestClose ={this.props.closeAddSection}>
          <div>
          <h2>Dodavanje nove oblasti za predmet {this.state.subjectId}: </h2>
            <form onSubmit={this.handleAddSectionForSubject}>
              <input type="text" name="sectionName" />
              <input type="hidden" value = {this.state.subjectId} name="subjectId" />
              <button>Add section</button>
            </form>
           </div>

            <button onClick={this.props.closeAddSection} >Close </button>
          </Modal>
        );
      }
}
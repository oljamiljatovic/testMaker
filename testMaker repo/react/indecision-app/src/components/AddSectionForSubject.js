import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import MyStatefulEditor from './MyStatefulEditor';
export default class AddSectionForSubject extends React.Component {

  constructor(props) {
    super(props);
    this.handleAddSectionForSubject = this.handleAddSectionForSubject.bind(this);
    this.changeEditorState = this.changeEditorState.bind(this);
    this.state = {
      subjectId: props.subjectId,
      textFromEditor: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.subjectId !== this.props.subjectId) {
      this.setState({
        subjectId: nextProps.subjectId
      })
    }
  }


  handleAddSectionForSubject(e) {
    e.preventDefault();
    const sectionName = this.state.textFromEditor;
    const subjectId = e.target.elements.subjectId.value;

    const url = 'http://localhost:8080/addSectionForSubject/' + subjectId;
    let data = {
      id: null,
      name: sectionName
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
      .then(data => this.props.handleAddSectionForSubject(data));

  }
  changeEditorState(textFromEditor) {
    this.setState({
      textFromEditor: textFromEditor
    })
  }
  render() {

    return (
      <Modal 
        isOpen={this.props.canAddSectionShow}
        contentLabel="Information"
        onRequestClose={this.props.closeAddSection}
        >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 modal-title-padding modal-create-header ">
              <label className= "text-color">Dodavanje nove oblasti za predmet 'Programski prevodioci': </label>
              <button type="button" className="close" onClick={this.props.closeAddSection}  data-dismiss="modal">x</button>
            </div>
          </div>
          <div className="row  div-centered" >
            <div className="offset-lg-3 col-lg-6 offset-lg-3">

              <form onSubmit={this.handleAddSectionForSubject} className="form-padding">

                <div className="row centered-content">
                  <div className="form-group col-lg-12 ">
                    <label className= "text-color">Naziv oblasti:</label>
                    <MyStatefulEditor changeEditorState={this.changeEditorState} />
                  </div>
                </div>
                <div className="row ">
                  <div className="col-lg-12 ">
                    <button onClick={this.props.closeAddSection} className="rounded-button btn button-primary-color floating" >Zatvori </button>
                    <button className="rounded-button btn button-primary-color floating-and-margin">Dodaj </button>
                  </div>
                </div>
                <input type="hidden" value={this.state.subjectId} name="subjectId" />

              </form>
            </div>
          </div>


        </div>


      </Modal>
    );
  }
}
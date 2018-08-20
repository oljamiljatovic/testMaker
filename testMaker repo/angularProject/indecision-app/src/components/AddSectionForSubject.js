import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
export default class AddSectionForSubject extends React.Component {

  constructor(props) {
    super(props);
    this.handleAddSectionForSubject = this.handleAddSectionForSubject.bind(this);
    this.state = {
      subjectId: props.subjectId
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
    const sectionName = e.target.elements.sectionName.value.trim();
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
  render() {

    return (
      <Modal className="modalDialog"
        isOpen={this.props.canAddSectionShow}
        contentLabel="Information"
        onRequestClose={this.props.closeAddSection}>


        <div className="container">
          <div className="row">
            <div className="col-lg-12 modal-title-padding ">
              <label>Dodavanje nove oblasti za predmet {this.state.subjectId}: </label>
            </div>
          </div>
          <div className="row  div-centered" >
            <div className="offset-lg-3 col-lg-6 offset-lg-3 first ">

              <form onSubmit={this.handleAddSectionForSubject} className="form-padding">

                <div className="row centered-content">
                  <div className="form-group ">
                    <label>Naziv sekcije:</label>
                    <input type="text" name="sectionName" className="form-control form-control-lg " />

                  </div>
                </div>
                <div className="row right-content">
                  <div className="offset-lg-9 col-lg-2 ">
                    <button className="btn btn-primary">Dodaj </button>
                  </div>
                </div>
                <input type="hidden" value={this.state.subjectId} name="subjectId" />

              </form>
            </div>
          </div>


          <div className="row ">
            <div className=" offset-lg-10 col-lg-2 padding-bottom ">
              <button onClick={this.props.closeAddSection} className="btn btn-primary" >Close </button>
            </div>
          </div>

        </div>


      </Modal>
    );
  }
}
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
//import validator from 'validator';
import MyStatefulEditor from './MyStatefulEditor';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
/* const required = (value) => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return 'require';
  }
}; */
const required = fieldValue => fieldValue ? undefined : "Please enter a value";
/* const lessThanValue = value => fieldValue =>
  fieldValue < value ? undefined : `Value must be less than ${value}`;

const greaterThanField = (fieldName) => (fieldValue,state) =>
  fieldValue > state[fieldName] ? undefined : `Value must be greater that ${fieldName}`;
 */
export default class AddSubject extends React.Component {

  constructor(props) {
    super(props);
    this.handleAddSubject = this.handleAddSubject.bind(this);
    this.validateField = this.validateField.bind(this);
    this.changeEditorState = this.changeEditorState.bind(this);
    this.state = {

      validations: {
        "price": [required]
      },
      error: [],
      textFromEditor: ""
    };
  }

  validateField(fieldName, fieldValue) {
    let errorMessage;
    this.state.validations[fieldName].forEach((validation) => {

      errorMessage = validation(fieldValue);

      var newArray = this.state.error.slice();
      newArray.push({ fieldName: errorMessage });
      // this.setState({ subjectList: newArray })
      this.setState({
        error: newArray
      })
      if (errorMessage) {
        return false
      } else {
        return true
      }

    });
  }
  handleAddSubject(e) {
    e.preventDefault();

    //const name = e.target.elements.nameOfSubject.value.trim();

    /* let fieldValue = Number(name); *//* 
    if(this.validateField("price",fieldValue)){ */
    const url = 'http://localhost:8080/addSubject';
    let data = {
      name: this.state.textFromEditor
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
      .then(data => this.props.handleAddSubject(data));
    /*   } */

  }

  changeEditorState(textFromEditor) {
    this.setState({
      textFromEditor: textFromEditor
    })
  }
  render() {

    return (
      <Modal 
        isOpen={this.props.canAddSubjectShow}
        contentLabel="Information"
        onRequestClose={this.props.closeAddSubject}     
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 modal-title-padding modal-create-header ">
              <label className="text-color">Dodavanje novog predmeta </label>
              <button type="button" className="close" onClick={this.props.closeAddSubject} data-dismiss="modal">x</button>
            </div>
          </div>
          <div className="row" >
            <div className="offset-lg-3 col-lg-6 offset-lg-3  ">
              <form onSubmit={this.handleAddSubject} >
                <div className="row centered-content">
                  <div className="form-group col-lg-12 ">
                    <label className="text-color">Naziv predmeta:</label>
                    <MyStatefulEditor changeEditorState={this.changeEditorState} />
                  </div>
                </div>
                <div className="row ">
                  <div className="col-lg-12">
                   
                    <button type = "button"  onClick={this.props.closeAddSubject}  className="rounded-button btn floating button-primary-color" >Zatvori</button>
                    <button className="rounded-button btn button-primary-color floating-and-margin ">Dodaj </button>
                  </div>
                </div>
              </form>
            </div>
          </div>


        {/*   <div className="row ">
            <div className=" offset-lg-10 col-lg-2 padding-bottom ">
              <button onClick={this.props.closeAddSubject} className="rounded-button btn  button-primary-color" >Zatvori </button>
            </div>
          </div> */}

        </div>

      </Modal>


    );
  }
}
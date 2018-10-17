import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
//import validator from 'validator';

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
export default class AddSubject extends React.Component{

    constructor(props) {
        super(props);
        this.handleAddSubject = this.handleAddSubject.bind(this);
        this.validateField = this.validateField.bind(this);
        this.state = {
          
          validations:{
            "price":[required]
          },
          error:[]
        };
      }

      validateField(fieldName,fieldValue) {
        let errorMessage;
        this.state.validations[fieldName].forEach( (validation)=>{
         
            errorMessage = validation(fieldValue);

            var newArray = this.state.error.slice();
            newArray.push({fieldName: errorMessage});
           // this.setState({ subjectList: newArray })
              this.setState({
               error : newArray
              })
             if(errorMessage){
               return false
              }else{
                return true
              }
         
        });
      }
      handleAddSubject(e) {
        e.preventDefault();
            
        const name = e.target.elements.nameOfSubject.value.trim();

        /* let fieldValue = Number(name); *//* 
        if(this.validateField("price",fieldValue)){ */
          const url = 'http://localhost:8080/addSubject';
          let data = {
              name : name
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
          .then(data => this.props.handleAddSubject(data) );
      /*   } */
  
      }
      render() {
        
        return (

          <Modal className="modalDialog"
          isOpen={this.props.canAddSubjectShow}
          contentLabel="Information"
          onRequestClose={this.props.closeAddSubject}
          className = "modal-create"
          >
  
  
          <div className="container">
            <div className="row">
              <div className="col-lg-12 modal-title-padding modal-create-header ">
                <label className= "text-color">Dodavanje novog predmeta </label>
                <button type="button" className="close" onClick={this.props.closeAddSubject}  data-dismiss="modal">x</button>
              </div>
            </div>
            <div className="row  div-centered" >
              <div className="offset-lg-3 col-lg-6 offset-lg-3  ">
  
                <form onSubmit={this.handleAddSubject} className="form-padding">
  
                  <div className="row centered-content">
                    <div className="form-group col-lg-12 ">
                      <label className= "text-color">Naziv predmeta:</label>
                      <input type="text" name="nameOfSubject" className="form-control form-control-lg " />
  
                    </div>
                  </div>
                  <div className="row right-content">
                    <div className="offset-lg-8 col-lg-2 ">
                      <button className="rounded-button btn  button-primary-color">Dodaj </button>
                    </div>
                  </div>
                
  
                </form>
              </div>
            </div>
  
  
            <div className="row ">
              <div className=" offset-lg-10 col-lg-2 padding-bottom ">
                <button onClick={this.props.closeAddSubject} className="rounded-button btn  button-primary-color" >Zatvori </button>
              </div>
            </div>
  
          </div>
  
  
        </Modal>

     /*      <div>
        
            <form onSubmit={this.handleAddSubject}>
              <input type="text" name="nameOfSubject" />
              <span className="error-message">{this.state.error.length}</span>
              <button>Add subject</button>
            </form>
           </div> */
          
        );
      }
}
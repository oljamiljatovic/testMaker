import React from 'react';
import ReactDOM from 'react-dom';
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

        let fieldValue = Number(name);
        if(this.validateField("price",fieldValue)){
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
        }
  
      }
      render() {
        
        return (
          <div>
          {/*   {this.state.error && <p>{this.state.error}</p>} */}
            <form onSubmit={this.handleAddSubject}>
              <input type="text" name="nameOfSubject" />
              <span className="error-message">{this.state.error.length}</span>
              <button>Add subject</button>
            </form>
           </div>
          
        );
      }
}
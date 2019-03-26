import React from 'react';
import ReactDOM from 'react-dom';
import MyStatefulEditor from './MyStatefulEditor';
import { RadioGroup, RadioButton } from 'react-radio-buttons';

export default class AddAnswer extends React.Component {

    constructor(props) {
        super(props);
        this.handleAddAnswer = this.handleAddAnswer.bind(this);
        this.changeEditorState = this.changeEditorState.bind(this);
        this.exactitudeChanged = this.exactitudeChanged.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
      

        this.state = {
            questions: [],
            options: [],
            isChecked: false,
            sectionId: '',
            answerText : '',
            exactitude : false
        };
    }

    handleAddAnswer(e) {
        e.preventDefault();

        const answer = {};
        answer.text = this.state.answerText;
        
      //  e.target.elements.text.value;

        if (this.props.renderExactitude === true) {
            if (this.state.exactitude == "true") {
                answer.exactitude = true;
            } else {
                answer.exactitude = false;
            }

        } else {
            answer.exactitude = true;
        }

        if (answer.exactitude == true) {
            answer.sign = "+";
        } else {
            answer.sign = "-";
        }
        this.props.addAnswer(answer);
        //e.target.elements.text.value = ''; //DOPUNITI DA ISPRAZNI EDITOR

   
    }
    addAnswer(){ //provjeriiiiii
        const answer = {};
        answer.text = this.state.answerText;
        
        if (this.props.renderExactitude === true) {
            if (this.state.exactitude == "true") {
                answer.exactitude = true;
            } else {
                answer.exactitude = false;
            }

        } else {
            answer.exactitude = true;
        }

        if (answer.exactitude == true) {
            answer.sign = "+";
        } else {
            answer.sign = "-";
        }
        this.props.addAnswer(answer);
        //e.target.elements.text.value = ''; //DOPUNITI DA ISPRAZNI EDITOR
    }

    changeEditorState(newText){
        this.setState({
            answerText : newText
         })

    }

    exactitudeChanged(newExactitude){
        this.setState({
            exactitude : newExactitude.target.value
         })

    }
    render() {
        return (
           <div className = "row padding-top-5">
                <div className =  'form-group col-lg-12'>
                    <form onSubmit={this.handleAddAnswer}>
                        <label className= "text-color">Tekst odgovora:</label>
                        <MyStatefulEditor changeEditorState = {this.changeEditorState}/> 
                        {!this.props.renderExactitude && <button className = "rounded-button btn button-primary-color floating margin-top-5 ">Dodaj odgovor</button>}
                    </form>
                </div>
                    
                {this.props.renderExactitude && <div className= 'form-group col-lg-12'>
                    <form className="row"> 
                        <div className="col-lg-4">
                            <label>
                                <input type="radio" name="exactitude" 
                                        value={true} 
                                        checked={this.state.exactitude === 'true'} 
                                        onChange={this.exactitudeChanged} /> Tacan
                            </label> 
                        </div>
                        <div className="col-lg-4">
                            <label>
                                <input type="radio" name="exactitude" 
                                        value={false} 
                                        checked={this.state.exactitude === 'false'} 
                                        onChange={this.exactitudeChanged} /> Netacan
                            </label> 
                        </div> 
                                
                        {this.props.renderExactitude && <div className ="col-lg-1 offset-lg-3">
                        <button type="button" className = "rounded-button btn-lg button-primary-color floating fa fa-check"
                        onClick={(e) => {
                            this.addAnswer();
                        }}></button>    
                        </div>}  
                                     
                    </form> 
                </div>}
          </div>
        );
    }
}
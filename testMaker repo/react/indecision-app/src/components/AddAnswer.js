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
           <div className = "row">
                <form onSubmit={this.handleAddAnswer}>
        
                    <div className="row ">
                        <div 
                         className =  'form-group col-lg-12 '>
                            <label className= "text-color">Tekst odgovora:</label>
                            <MyStatefulEditor changeEditorState = {this.changeEditorState}/> 
                        </div>
                    </div>

                 
                    <button className = "rounded-button btn button-primary-color">Dodaj odgovor</button>
                </form>

                <form> 
                {this.props.renderExactitude && 
                        <div
                         className= 'form-group col-lg-12 '>
                           <label className= "text-color">Tačnost :</label>
                         
                           <div className="radio"><label>
                            <input type="radio" name="exactitude" 
                                   value={true} 
                                   checked={this.state.exactitude === 'true'} 
                                   onChange={this.exactitudeChanged} /> Tacan
                            </label> </div>
                            <div className="radio"><label>
                            <input type="radio" name="exactitude" 
                                   value={false} 
                                   checked={this.state.exactitude === 'false'} 
                                   onChange={this.exactitudeChanged} /> Netacan
                            </label> </div>
                          {/*   <input type="text" name="exactitude" className="form-control form-control-lg" /> */}
                       
                    </div>}
                </form>
          </div>
        );
    }
}
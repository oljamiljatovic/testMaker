import React from 'react';
import ReactDOM from 'react-dom';
import ImportFile from './ImportFile';
import AddQuestion from './AddQuestion';

export default class Actions extends React.Component{

    constructor(props) {
        super(props);
        this.importFile = this.importFile.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
       // this.handleAddSubject = this.handleAddSubject.bind(this);
        
        this.state = {
          importFileVisibility : false,
          addQuestionVisibility : false
        };
      }

      importFile(){
        this.setState({
            importFileVisibility : true
        }) 
      }
      
      addQuestion(){
        this.setState({
            addQuestionVisibility : true
        }) 
      }

      render() {
      
        return(
            <div> 
               <button  onClick={
                (e) => {
                    this.importFile();
                }
            }>Ucitavanje fajla</button>

             <button  onClick={
                (e) => {
                    this.addQuestion();
                }
            }>Dodavanje pitanja</button>
            {this.state.importFileVisibility && <ImportFile/>} 
            {this.state.addQuestionVisibility && <AddQuestion/>} 
            </div>
        );
    }

}
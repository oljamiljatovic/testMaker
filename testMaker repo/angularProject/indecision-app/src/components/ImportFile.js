import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';

export default class ImportFile extends React.Component{

    constructor(props) {
        super(props);
        this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.schedulesInSections = this.schedulesInSections.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.renderCategory = this.renderCategory.bind(this);
        this.state = {   
            questions: [],
            options : [],
            isChecked: false,
            sectionId : '',
            file:null,
            questionsVisibility :false
        };
      }

      toggleCheckboxChange(){
        this.setState(({ isChecked }) => (
            {
              isChecked: !isChecked,
            }
          ));
      }

      handleChangeSelect(event) {
        this.setState({sectionId: event.target.value});
      }

      schedulesInSections(){
        let data = this.state.questions;
        if(this.state.isChecked){

        const url = 'http://localhost:8080/scheduleQuestionsInSections/'+this.state.sectionId;
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
        .then(data => this.setState({ 
          sectionId : data.id}) );
   
        }
      }
      componentDidMount() {
      var quizUrl = 'http://localhost:8080/sectionList';
        fetch(quizUrl, {
          mode: 'cors',
          method: "GET",
          response: true
        })
        .then(res => res.json())
        .then(data => this.setState({options: data})); 

      }
    
    fileUpload(file){
   

        const url = 'http://localhost:8080/fileUploadPlease';
        let formData = new FormData();
        formData.append('file',file)
        
        let fetchData = { 
            method: 'POST', 
            body : formData,
            response: true
          

        }
        fetch(url, fetchData)
        .then(res => res.json())
        .then(data => this.setState({
          questions: data,
          questionsVisibility : true
        }) ); 
   
        
      }

    onChangeFile(e) {
        this.setState({file:e.target.files[0]})
      }

      onFormSubmit(e){
        e.preventDefault();
        this.fileUpload(this.state.file);
         
      }
      renderCategory(category){
        if(category == "EASY"){
          return "Lak"
        }else if(category == "MEDIUM"){
          return "Srednje"
        }else if(category == "HARD"){
          return "Tezak"
        }
      }
//RENDER FUNKCIJE
      renderQuestions() {
        return this.state.questions.map(question => (
                <tr key={question.id}>
                    <td>{question.id}</td>
                    <td>{question.name}</td>
                    <td>{question.type}</td>
                    <td>{this.renderCategory(question.category)}</td>
                    <td>{question.points}</td>
                 {/*    <td><input type="button" value="Oblasti" onClick={
                (e) => {
                    this.optionsForSubject(subject.id);
                }
            }/></td> */}
                </tr>
        ))
    }
      render() {
      
        return(
          <div>
              <Header />
            <div>
                <br />
            <form onSubmit={this.onFormSubmit}>
                 <h1>Ucitavanje fajla</h1>
                  <input type="file" onChange={this.onChangeFile} />
                 <button type="submit">Ucitaj</button>
            </form>
            </div>
      <br/>
      {this.state.questionsVisibility && <div className = "questionAndAnswers">
                <table >
                    <thead>
                        <tr >
                            <th>ID</th>
                            <th>Naziv pitanja</th>
                            <th>Tip</th>
                            <th>Kategorija tezine</th>
                            <th>Broj bodova</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.renderQuestions()}
                    </tbody>
                </table>

                  <div ><br/>
                    <p>Odaberite oblast kojoj pitanja pripadaju : </p>
                  <label>
                    <input
                            type="checkbox"
                            value="Sva pitanja"
                            
                             checked={this.state.isChecked} 
                            onChange={this.toggleCheckboxChange}/> Sva pitanja</label>
                     <select
                      name="Ime"
                      onChange={this.handleChangeSelect}>
     
      {this.state.options.map(opt => {
        return (
          <option
            key={opt.id}
            value={opt.id}>{opt.name}</option>
        );
      })} 
    </select>
    <button  onClick={
                (e) => {
                    this.schedulesInSections();
                }
            } >Dodaj </button>
                </div>
                
          
            </div>}
            </div>
        );
    }
    }


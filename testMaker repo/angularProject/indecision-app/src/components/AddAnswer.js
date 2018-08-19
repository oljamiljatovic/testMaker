import React from 'react';
import ReactDOM from 'react-dom';


export default class AddAnswer extends React.Component {

    constructor(props) {
        super(props);
        this.handleAddAnswer = this.handleAddAnswer.bind(this);
        // /this.createCheckboxes = this.createCheckboxes.bind(this);
        // this.importFile = this.importFile.bind(this);
        // this.handleAddSubject = this.handleAddSubject.bind(this);

        this.state = {
            questions: [],
            options: [],
            isChecked: false,
            sectionId: ''
        };
    }

    handleAddAnswer(e) {
        e.preventDefault();

        const answer = {};
        answer.text = e.target.elements.text.value;

        if (this.props.renderExactitude === true) {
            if (e.target.elements.exactitude.value == "true") {
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
        e.target.elements.text.value = '';

        if (this.props.renderExactitude === true) {
            e.target.elements.exactitude.value = '';
        }
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleAddAnswer}>

                    <div className="row">
                        <div className="form-group col-lg-5">
                            <label>Tekst pitanja:</label>
                            <input type="text" name="text" className="form-control form-control-lg " />
                        </div>
                    </div>

                    {this.props.renderExactitude && <div className="row">
                        <div className="form-group col-lg-5">

                           <label>Tacnost :</label>
                                <input type="text" name="exactitude" className="form-control form-control-lg" />
                        </div>
                    </div>}
                    <button>Add answer</button>
                </form>
            </div>
        );
    }
}
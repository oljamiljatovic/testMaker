import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';
import {Editor, EditorState, RichUtils} from 'draft-js';

export default class MyStatefulEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
        this.onChange = (editorState) => this.setState({editorState});
        this.onBoldClick = this.onBoldClick.bind(this);
        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
       
    }

    _handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          this.onChange(newState);
          return true;
        }
        return false;
      }
  onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  onChange(editorState) {
    this.setState({editorState});
  }


  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }
  
  render () {
    const {editorState} = this.state;
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
        <div className="RichEditor-root">

       <InlineStyleControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
              />
        {/* <button onClick={this.onBoldClick.bind(this)}>Bold</button> */}
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange.bind(this)}
          className="RichEditor-root"
        />
      </div>
 
     // <RichTextEditor
        //value={this.state.value}
        //onChange={this.onChange}
      ///>
    );
  }
}

var INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
  ];
  const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();
    
    return (
      <div className="RichEditor-controls">
        {INLINE_STYLES.map((type) =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
      </div>
    );
  };

  class StyleButton extends React.Component {
    constructor() {
      super();
      this.onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
      };
    }
    render() {
      let className = 'RichEditor-styleButton';
      if (this.props.active) {
        className += ' RichEditor-activeButton';
      }
      return (
        <span className={className} onMouseDown={this.onToggle}>
          {this.props.label}
        </span>
      );
    }
  }
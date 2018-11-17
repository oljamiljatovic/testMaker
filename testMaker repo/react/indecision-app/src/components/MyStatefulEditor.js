import React, { Component, PropTypes } from 'react';
import RichTextEditor from 'react-rte';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
export default class MyStatefulEditor extends React.Component {
  constructor(props) {
    super(props);

    //this.onChange = this.onChange.bind(this);
    this.onBoldClick = this.onBoldClick.bind(this);
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);

    this.state = {
      editorState: EditorState.createEmpty()
    };


    this.onChange = (editorState) => {
      //alert(this.state.editorState.getCurrentContent().getPlainText());
      if (this.state.editorState.getCurrentContent().getPlainText() !== editorState.getCurrentContent().getPlainText()) {
        // alert(stateToHTML(this.state.editorState.getCurrentContent()));
        //alert(convertToRaw(editorState.getCurrentContent()));

        this.setState({ editorState });
        this.props.changeEditorState(editorState.getCurrentContent().getPlainText());
      } else {
        this.setState({ editorState });
      }

    }
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
  /* onChange(newEditorState) {
    if (this.state.editorState.getCurrentContent().getPlainText() !== newEditorState.getCurrentContent().getPlainText()) {
      // There was a change in the content  
      this.setState({newEditorState});
      //this.props.changeEditorState(newEditorState.getCurrentContent().getPlainText());
    } else {
     
      this.setState({newEditorState});
    }
  

    //this.props.changeEditorState(editorState);
  }
 */

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );

    const content = this.state.editorState.getCurrentContent();
    const newText = content.getPlainText();
    alert(newText);
  }

  render() {
    const { editorState } = this.state;
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
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          className="RichEditor-root"
        />
      </div>
    );
  }
}

var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Mono', style: 'CODE' },
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
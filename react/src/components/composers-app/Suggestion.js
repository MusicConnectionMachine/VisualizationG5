import React from 'react';


class Suggestion extends React.Component {

  render() {
    const {
      title,
      handleSuggestionClick,
    } = this.props;

    return (
      <div onClick={() => handleSuggestionClick(title)}>
        {title}
      </div>
    );
  }
}

Suggestion.propTypes = {
  title: React.PropTypes.string.isRequired,
  handleSuggestionClick: React.PropTypes.func.isRequired,
};


export default Suggestion;

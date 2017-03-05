import React from 'react';


export default class SearchBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: props.query };
    this.handleChange = this.handleChange.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    this.setState({ query: nextProps.query });
  }


  handleChange(event) {
    this.setState({ query: event.target.value });
  }


  render() {
    return (
      <div>
        <form id="search-form" method="GET" action="/search">
          <div className="input-group" style={ { marginTop: '30px' } }>
            <input type="text" placeholder="Search for composer, artist, work ..." name="q" className="form-control"
              value={ this.state.query } onChange={ this.handleChange }
            />
            <span className="input-group-btn">
              <button type="button" className="btn btn-secondary">Search!</button>
            </span>
          </div>
        </form>
      </div>
    );
  }
}


SearchBarComponent.propTypes = {
  query: React.PropTypes.string,
};

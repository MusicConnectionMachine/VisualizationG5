import Autocomplete from 'react-autocomplete';
import React from 'react';


export default class SearchBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.query,
      suggestions: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    this.setState({ query: nextProps.query });
  }


  static getItemValue(item) {
    return item._index === 'work' ? item._source.title : item._source.name;
  }


  handleChange(event, query) {
    this.setState({ query });
    if (query.length >= 2) {
      const http = new XMLHttpRequest();
      const params = JSON.stringify({ query });
      http.open('POST', '/api/v1/search', true);
      http.setRequestHeader('Content-type', 'application/json');
      http.onreadystatechange = function onreadystatechange() {
        if (http.readyState === 4 && http.status === 200) {
          const suggestions = JSON.parse(http.response);
          suggestions.sort((a, b) => {
            if (a._index < b._index) {
              return -1;
            }
            if (a._index > b._index) {
              return 1;
            }
            if (a._score > b._score) {
              return -1;
            }
            if (a._score < b._score) {
              return 1;
            }
            return 0;
          });
          this.setState({ suggestions });
        }
      }.bind(this);
      http.send(params);
    } else {
      this.setState({ suggestions: [] });
    }
  }


  handleSelect(query, item) {
    window.open(`/${item._index}/${item._id}`, '_self');
  }


  renderItems(items) {
    const types = [];
    items.forEach(item => types.push(item.props.children._index));
    return items.map((item, index) => {
      item.props.children = SearchBarComponent.getItemValue(item.props.children);
      if (index === 0 || types[index - 1] !== types[index]) {
        const style = {
          color: '#6e6b73',
          paddingTop: '16px',
          marginBottom: '8px',
          borderBottom: '1px solid',
          fontWeight: 'bold',
        };
        return [<div style={style}>{types[index].toUpperCase()}</div>, item];
      }
      return item;
    });
  }


  render() {
    return (
      <div>
        <form id="search-form" method="GET" action="/search">
          <div className="input-group">
            <Autocomplete
              getItemValue={ SearchBarComponent.getItemValue }
              inputProps={{
                name: 'q',
                placeholder: 'Search for composer, artist, work ...',
                type: 'text',
              }}
              items={this.state.suggestions}
              onChange={ this.handleChange }
              onSelect={ this.handleSelect }
              renderItem={(item, isHighlighted) => (
                <div style={isHighlighted ? { backgroundColor: '#ffa500' } : {} }>
                  { item }
                </div>
              )}
              renderMenu={(items) => (
                <div>
                  {this.renderItems(items)}
                </div>
              )}
              value={this.state.query}
              wrapperProps={ { className: 'form-control' } }
              wrapperStyle={ { } }
            />
          </div>
        </form>
      </div>
    );
  }
}


SearchBarComponent.propTypes = {
  query: React.PropTypes.string,
};

import React from 'react';


export default class SearchResultsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: [],
    };
  }


  componentWillMount() {
    const http = new XMLHttpRequest();
    http.open('GET', `${this.props.host}/search?query=${encodeURIComponent(this.props.query)}&mode=search`, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function onreadystatechange() {
      if (http.readyState === 4 && http.status === 200) {
        const hits = JSON.parse(http.response);
        this.setState({ hits });
      }
    }.bind(this);
    http.send();
  }


  render() {
    return (
      <div>
        {
          this.state.hits.map(function displayHit(hit) {
            return (
              <div className="card">
                <div className="card-block">
                  {
                    (function chooseDisplay() {
                      switch (hit._index) {
                        case 'composer':
                          return (
                            <a href={'/composer/' + hit._id}>
                              <h4 className="card-title">{hit._source.name}</h4>
                            </a>
                          );
                        case 'musician':
                          return (
                            <a href={'/musician/' + hit._id}>
                              <h4 className="card-title">{hit._source.name}</h4>
                            </a>
                          );
                        case 'work':
                          return (
                            <a href={'/work/' + hit._id}>
                              <h4 className="card-title">{hit._source.title}</h4>
                            </a>
                          );
                        default:
                          return ('');
                      }
                    }())
                  }
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}


SearchResultsComponent.propTypes = {
  host: React.PropTypes.string.isRequired,
  query: React.PropTypes.string.isRequired,
};

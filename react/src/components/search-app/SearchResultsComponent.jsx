import React from 'react';


export default class SearchResultsComponent extends React.Component {
  render() {
    return (
      <div>
        {
          window.__dataForReact.hits.map(function displayHit(hit) {
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

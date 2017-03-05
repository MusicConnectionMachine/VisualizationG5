const elasticsearch = require('elasticsearch');


class ElasticsearchService {

  /**
   *
   * @param {string} host
   */
  constructor(host) {
    this.client = new elasticsearch.Client({ host });
  }


  /**
   * Performs a search over all fields.
   *
   * @param {string} query
   * @param {string} [index] - if this is undefined, the search will be performed over all indices
   * @param {string} [type] - if this is undefined, the search will be performed over all types
   * @return {Promise}
   */
  search(query, index, type) {
    return this.client.search({
      q: query,
      index,
      type,
    }).then(result => result.hits.hits);
  }


  /**
   *
   * @param {string} query
   * @param {Array.<string>} fields - only fields which uses an autocomplete analyzer should be
   *  passed
   * @param {string} [index] - if this is undefined, the search will be performed over all indices
   * @param {string} [type] - if this is undefined, the search will be performed over all types
   * @param {number} [size=10] - the number of suggestions which should be returned
   * @return {Promise}
   */
  autoSuggestionSearch(query, fields, index, type, size) {
    return this.client.search({
      body: {
        query: {
          multi_match: {
            query,
            fields,
          },
        },
      },
      index,
      type,
      size: size || 10,
    }).then(result => result.hits.hits);
  }
}


module.exports = ElasticsearchService;

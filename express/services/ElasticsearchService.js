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
}


module.exports = ElasticsearchService;

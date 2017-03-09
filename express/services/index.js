const ElasticsearchService = require('./ElasticsearchService');


module.exports = {
  elasticsearchService: new ElasticsearchService(process.env.ELASTICSEARCH_HOST || 'elasticsearch:9200'),
};

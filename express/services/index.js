const ElasticsearchService = require('./ElasticsearchService');


module.exports = {
  elasticsearchService: new ElasticsearchService(process.env.ELASTICSERACH_HOST || 'localhost:9200'),
};

#!/usr/bin/env node
const elasticsearch = require('elasticsearch');
const fs = require('fs');
const path = require('path');


const insertToElasticSearch = function insertToElasticSearch() {
  const client = new elasticsearch.Client({
    host: process.env.ELASTICSEARCH_HOST || 'elasticsearch:9200',
  });
  const TYPE_NAME = 'external';
  const indices = [];
  const mockupDataDirectory = path.join(__dirname, '../../mock_data');
  fs.readdirSync(mockupDataDirectory).forEach((elementName) => {
    const filePath = path.join(mockupDataDirectory, elementName);
    const stat = fs.statSync(filePath);
    if (stat.isFile() && path.extname(filePath) === '.json') {
      const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      indices.push({
        name: path.basename(elementName, '.json'),
        data: fileContent.data,
        meta: fileContent.meta,
      });
    }
  });
  indices.forEach((index) => {
    client.indices.delete({ index: index.name }).catch(() => {
      // Index does not exist.
    })
      .then(() => client.indices.create({ index: index.name }))
      .then(() => client.indices.close({
        index: index.name,
      }))
      .then(() => client.indices.putSettings({
        index: index.name,
        body: {
          analysis: {
            analyzer: {
              autocomplete: {
                tokenizer: 'autocomplete',
                filter: [
                  'lowercase',
                ],
              },
              autocomplete_search: {
                tokenizer: 'lowercase',
              },
            },
            tokenizer: {
              autocomplete: {
                type: 'edge_ngram',
                min_gram: 2,
                max_gram: 15,
                token_chars: [
                  'letter',
                ],
              },
            },
          },
        },
      }))
      .then(() => client.indices.open({
        index: index.name,
      }))
      .then(() => client.indices.putMapping({
        index: index.name,
        type: TYPE_NAME,
        body: index.meta.mapping,
      }))
      .then(() => {
        const body = [];
        index.data.forEach((el) => {
          const id = el.id;
          delete el.id;
          body.push({ index: { _index: index.name, _type: TYPE_NAME, _id: id } }, el);
        });
        return client.bulk({
          body,
        });
      })
      .then(() => client.indices.refresh({
        index: index.name,
      }));
  });
};

module.exports = insertToElasticSearch;

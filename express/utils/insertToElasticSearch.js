#!/usr/bin/env node
const elasticsearch = require('elasticsearch');
const fs = require('fs');
const path = require('path');


const insertToElasticSearch = function insertToElasticSearch() {
  const client = new elasticsearch.Client({
    host: 'elasticsearch:9200',
  });
  const indices = [];
  const mockupDataDirectory = path.join(__dirname, '../../mock_data');
  fs.readdirSync(mockupDataDirectory).forEach((elementName) => {
    const filePath = path.join(mockupDataDirectory, elementName);
    const stat = fs.statSync(filePath);
    if (stat.isFile() && path.extname(filePath) === '.json') {
      indices.push({
        name: path.basename(elementName, '.json'),
        elements: JSON.parse(fs.readFileSync(filePath, 'utf8')),
      });
    }
  });
  indices.forEach((index) => {
    client.indices.delete({ index: index.name }).catch(() => {
      // Index does not exist.
    }).then(() => {
      client.indices.create({ index: index.name }).then(() => {
        const body = [];
        index.elements.forEach((el) => {
          const id = el.id;
          delete el.id;
          body.push({ index: { _index: index.name, _type: 'external', _id: id } }, el);
        });
        client.bulk({
          body,
        });
      });
    });
  });
};

module.exports = insertToElasticSearch;

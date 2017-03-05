#!/usr/bin/env node
const
  elasticsearch = require('elasticsearch'),
  fs = require('fs'),
  path = require('path');


const client = new elasticsearch.Client({
  host: 'localhost:9200'
});
const TYPE_NAME = 'external';
const indices = [];
fs.readdirSync(__dirname).forEach(function (elementName) {
  const filePath = path.join(__dirname, elementName);
  const stat = fs.statSync(filePath);
  if (stat.isFile() && path.extname(filePath) === '.json') {
    const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    indices.push({
      name: path.basename(elementName, '.json'),
      data: fileContent.data,
      meta: fileContent.meta
    });
  }
});
indices.forEach(function (index) {
  client.indices.delete({index: index.name}).catch(function () {
    // Index does not exist.
  }).then(function () {
    return client.indices.create({index: index.name});
  }).then(function(){
    return client.indices.close({
      index: index.name
    });
  }).then(function () {
    return client.indices.putSettings({
      index: index.name,
      body: {
        analysis: {
          analyzer: {
            autocomplete: {
              tokenizer: 'autocomplete',
              filter: [
                'lowercase'
              ]
            },
            autocomplete_search: {
              tokenizer: 'lowercase'
            }
          },
          tokenizer: {
            autocomplete: {
              type: 'edge_ngram',
              min_gram: 2,
              max_gram: 15,
              token_chars: [
                'letter'
              ]
            }
          }
        }
      }
    });
  }).then(function(){
    return client.indices.open({
      index: index.name
    });
  }).then(function(){
    return client.indices.putMapping({
      index: index.name,
      type: TYPE_NAME,
      body: index.meta.mapping
    });
  }).then(function () {
    const body = [];
    index.data.forEach(el => {
      const id = el.id;
      delete el.id;
      body.push({index: {_index: index.name, _type: TYPE_NAME, _id: id}}, el);
    });
    return client.bulk({
      body: body
    });
  }).then(function () {
    return client.indices.refresh({
      index: index.name
    });
  });
});

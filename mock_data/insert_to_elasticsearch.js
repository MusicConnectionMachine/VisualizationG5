#!/usr/bin/env node
const
  elasticsearch = require('elasticsearch'),
  fs = require('fs'),
  path = require('path');


const client = new elasticsearch.Client({
  host: 'localhost:9200'
});
const indices = [];
fs.readdirSync(__dirname).forEach(function (elementName) {
  const filePath = path.join(__dirname, elementName);
  const stat = fs.statSync(filePath);
  if (stat.isFile() && path.extname(filePath) === '.json') {
    indices.push({
      name: path.basename(elementName, '.json'),
      elements: JSON.parse(fs.readFileSync(filePath, 'utf8'))
    });
  }
});
indices.forEach(function (index) {
  client.indices.delete({index: index.name}).catch(function () {
    // Index does not exist.
  }).then(function () {
    client.indices.create({index: index.name}).then(function () {
      const body = [];
      index.elements.forEach(el => {
        const id = el.id;
        delete el.id;
        body.push({index: {_index: index.name, _type: 'external', _id: id}}, el);
      });
      client.bulk({
        body: body
      });
    });
  });
});

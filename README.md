# VisualizationG5 [![Join the chat at https://gitter.im/MusicConnectionMachine/VisualizationG5](https://badges.gitter.im/MusicConnectionMachine/VisualizationG5.svg)](https://gitter.im/MusicConnectionMachine/VisualizationG5?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

In this repository we will build a visualization of the other teams aggregated data

## Docker

The Elasticsearch service (including the mock data) and Express server are available as Docker images. They can be run with:

    docker run musicconnectionmachine/visualizationg5-express
    docker run --user elasticsearch musicconnectionmachine/visualizationg5-elasticsearch
    
The builds will be updated with every push to the develop branch.

Link to the repositories: https://hub.docker.com/u/musicconnectionmachine/dashboard/

## Elasticsearch

Because the later, final database and data schema is not given at the beginning of this project, we defined some mock data and use a simple Elasticsearch setup. It provides a API for fetching data and perform searches.

### Setup

1. Install Elasticsearch: https://www.elastic.co/de/downloads/elasticsearch
2. Start Elasticsearch: bin/elasticsearch (default port 9200)
3. node mock_data/insert_to_elasticsearch.js

### JSON-REST-API (Some Examples)

Entry point: localhost:9200/

Get a single, specific entry:

    GET /composer/external/1
    GET /musician/external/101
    GET /work/external/1

Search for a composer:

    GET /composer/_search?q=Marks

Search across the full dataset:

    GET /_search?q=Katell

Search for a composer whose name begins with "Gra":

    GET /composer/_search
    {
      "query": {
          "match_phrase_prefix" : {
              "name" : "Gra"
          }
      }
    }

For more information, please read the [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html).

# Express

### Setup
  - Navigate to express folder
  - Run `yarn install` to install dependencies

### Development
  - Run `npm run dev` to start server in development environment
  - Run `npm run lint` before commiting to check code style
  - Run `npm run lint-fix` to try to automatically fix style errors

### Production
  - Run `npm install -g forever`
  - Run `npm run prod` to start server in production environment

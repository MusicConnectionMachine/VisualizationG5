# VisualizationG5 [![Join the chat at https://gitter.im/MusicConnectionMachine/VisualizationG5](https://badges.gitter.im/MusicConnectionMachine/VisualizationG5.svg)](https://gitter.im/MusicConnectionMachine/VisualizationG5?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

In this repository we will build a visualization of the other teams aggregated data

# Running with Docker-Compose

### Development
  - Run `docker-compose up` to start server in development environment
  - The express server is accessible at localhost:3000
  - The elasticsearch server is accessible at localhost:9200
  - Docker volume is mapped to local volume - no need to rebuild for changes

### Production
  - Run `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up`

## Dockerhub
Link to the repositories: https://hub.docker.com/u/musicconnectionmachine/dashboard/

## Mockup data

Because the later, final database and data schema is not given at the beginning of this project, we defined some mock data and use a simple Elasticsearch setup. It provides a API for fetching data and perform searches.


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

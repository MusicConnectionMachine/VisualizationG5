# VisualizationG5 [![Join the chat at https://gitter.im/MusicConnectionMachine/VisualizationG5](https://badges.gitter.im/MusicConnectionMachine/VisualizationG5.svg)](https://gitter.im/MusicConnectionMachine/VisualizationG5?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/46497d2554a4407aa2be616823f8a05d)](https://www.codacy.com/app/kordianbruck/VisualizationG5?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=MusicConnectionMachine/VisualizationG5&amp;utm_campaign=Badge_Grade)

In this repository we will build a visualization of the other teams aggregated data

During the development phase, the site is hosted on a simple virtual machine on AWS using the free tier. URL: http://54.68.164.199:8080/

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

# React

### Setup
  - Navigate to react folder
  - Run `yarn install` to install dependencies

### Development
  - Run `npm run dev` to start webapck server in development environment
  
### Express Integration 
  - Run `npm run build` to compile the react resources and make them available for express



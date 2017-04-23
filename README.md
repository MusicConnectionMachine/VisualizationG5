# VisualizationG5 [![Join the chat at https://gitter.im/MusicConnectionMachine/VisualizationG5](https://badges.gitter.im/MusicConnectionMachine/VisualizationG5.svg)](https://gitter.im/MusicConnectionMachine/VisualizationG5?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/46497d2554a4407aa2be616823f8a05d)](https://www.codacy.com/app/kordianbruck/VisualizationG5?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=MusicConnectionMachine/VisualizationG5&amp;utm_campaign=Badge_Grade)

In this repository we will build a visualization of the other teams aggregated data.



## Widgets

The widgets are hosted on:
* Timeline: http://mcmwidgets.azurewebsites.net/widgets/timeline-app.html
* Relations: http://mcmwidgets.azurewebsites.net/widgets/relations-widget.html
* Map: http://mcmwidgets.azurewebsites.net/widgets/map-app.html

The widgets present data concerning an artist or a work. There are three possibilities to tell the widgets which entity should be displayed:
* Pass the link to the corresponding page on [IMSLP](http://imslp.org):
```
open http://mcmwidgets.azurewebsites.net/widgets/timeline-app.html?imslp=http://imslp.org/wiki/Category:Bach%2C_Johann_Sebastian
```
* Pass the entityId and entityType (there are two types: "work" and "artist"):
```
open http://mcmwidgets.azurewebsites.net/widgets/timeline-app.html?entityId=550e8400-e29b-11d4-a716-446655440000&entityType=artist
```
* Use the widgets as React-Component:
```
import Application from './components/timeline-app/Application';
<Application entityType={entityType} entityId={entityId} />
```

The documentation and a demonstration of how to include the widgets in a iframe is [here](http://mcmwidgets.azurewebsites.net/documentation/).



## Dockerhub

[https://hub.docker.com/r/musicconnectionmachine/widgets/](https://hub.docker.com/r/musicconnectionmachine/widgets/)



## Express

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



## React

### Setup
  - Navigate to react folder
  - Run `yarn install` to install dependencies

### Development
  - Run `npm run dev` to start webapck server in development environment
  
### Express Integration 
  - Run `npm run build` to compile the react resources and make them available for express

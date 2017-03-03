FROM node
RUN apt-get update && apt-get install -y git
RUN git clone https://github.com/MusicConnectionMachine/VisualizationG5.git
WORKDIR VisualizationG5/express
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]

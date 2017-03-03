FROM elasticsearch:latest
RUN apt-get update && apt-get install -y git
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs
RUN git clone https://github.com/MusicConnectionMachine/VisualizationG5.git
RUN cd VisualizationG5; npm install; cd ..
EXPOSE 9200
# Elasticsearch gets 30 seconds to start up before the mock data will be inserted.
CMD (sleep 30 && nodejs VisualizationG5/mock_data/insert_to_elasticsearch.js) & \
    /usr/share/elasticsearch/bin/elasticsearch

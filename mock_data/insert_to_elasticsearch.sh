curl -XPUT 'localhost:9200/composer'
curl -XPOST 'localhost:9200/composer/external/_bulk' --data-binary @composer_elastic.json
curl -XPUT 'localhost:9200/musician'
curl -XPOST 'localhost:9200/musician/external/_bulk' --data-binary @musician_elastic.json
curl -XPUT 'localhost:9200/work'
curl -XPOST 'localhost:9200/work/external/_bulk' --data-binary @work_elastic.json
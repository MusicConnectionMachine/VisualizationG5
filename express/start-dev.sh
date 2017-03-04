#!/bin/bash

while ! curl http://elasticsearch:9200; do sleep 1; done;
  npm run dev

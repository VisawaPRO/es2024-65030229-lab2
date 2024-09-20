#!/bin/bash

# Start MongoDB container
docker run -d --name mongodbforjing -v ~/jing_project/mongodb/init.js:/docker-entrypoint-initdb.d/init.js mongo

# Start Express container
docker build -t expressforjing ~/jing_project/express
docker run -d --name expressforjing --link mongodbforjing -p 3000:3000 expressforjing

# Start Nginx container
docker run -d --name nginxforjing -p 8080:80 -v ~/jing_project/nginx/nginx.conf:/etc/nginx/nginx.conf -v ~/jing_project/nginx/index.html:/usr/share/nginx/html/index.html nginx


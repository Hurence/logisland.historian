# docker-chronix
solr chronix docker container


to build

    docker build -t hurence/chronix .
    docker build -t hurence/historian-opcua:1.1.0-SNAPSHOT .


to run

   docker run -p 8983:8983 --name chronix -it hurence/chronix:latest

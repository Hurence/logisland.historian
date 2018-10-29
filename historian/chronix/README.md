# docker-chronix
solr chronix docker container


to build

    docker build -t hurence/chronix .
    docker build -t hurence/historian-chronix:1.0.1-RC1 .


to run

   docker run -p 8983:8983 --name chronix -it hurence/chronix:latest

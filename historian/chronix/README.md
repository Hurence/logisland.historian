# docker-chronix
solr chronix docker container


to build

    docker build -t hurence/chronix .


to run

   docker run -p 8983:8983 --name chronix -it hurence/chronix:latest

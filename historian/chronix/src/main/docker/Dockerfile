
FROM    openjdk:8-jre-alpine
LABEL maintainer="thomas.bailet@hurence.com"

# Override the solr download location with e.g.:
#   docker build -t mine --build-arg SOLR_DOWNLOAD_SERVER=http://www-eu.apache.org/dist/lucene/solr .
ARG SOLR_DOWNLOAD_SERVER

RUN apk add --no-cache \
        lsof \
        gnupg \
        procps \
        tar \
        bash
RUN apk add --no-cache ca-certificates wget && \
        update-ca-certificates

ENV SOLR_USER="solr" \
    SOLR_UID="8983" \
    SOLR_GROUP="solr" \
    SOLR_GID="8983" \
    SOLR_VERSION="6.4.2" \
    SOLR_URL="https://github.com/ChronixDB/chronix.server/releases/download/v0.5-beta/chronix-0.5-beta.zip" \
    PATH="/opt/solr/bin:/opt/docker-solr/scripts:$PATH"

RUN addgroup -S -g $SOLR_GID $SOLR_GROUP && \
    adduser -S -u $SOLR_UID -G $SOLR_GROUP $SOLR_USER


RUN mkdir -p /opt/solr && \
  echo "downloading $SOLR_URL" && \
  wget -q $SOLR_URL -O /opt/solr.zip
RUN cd /opt && unzip /opt/solr.zip  &&  mv  chronix-solr-6.4.2/* solr/ &&  \
  rm -r chronix-solr-6.4.2 && rm /opt/solr.zip && \
  mkdir -p /opt/solr/server/solr/lib /opt/solr/server/solr/mycores /opt/solr/server/logs /docker-entrypoint-initdb.d /opt/docker-solr && \
  sed -i -e 's/"\$(whoami)" == "root"/$(id -u) == 0/' /opt/solr/bin/solr && \
  sed -i -e 's/lsof -PniTCP:/lsof -t -PniTCP:/' /opt/solr/bin/solr && \
  sed -i -e 's/#SOLR_PORT=8983/SOLR_PORT=8983/' /opt/solr/bin/solr.in.sh && \
  sed -i -e '/-Dsolr.clustering.enabled=true/ a SOLR_OPTS="$SOLR_OPTS -Dsun.net.inetaddr.ttl=60 -Dsun.net.inetaddr.negative.ttl=60"' /opt/solr/bin/solr.in.sh && \
  chown -R $SOLR_USER:$SOLR_GROUP /opt/solr





COPY solr/chronix/conf /opt/solr/server/solr/chronix/conf
COPY solr/chronix/lib/chronix-server-query-handler-0.5-beta.jar /opt/solr/server/solr/chronix/lib
COPY solr/chronix/lib/chronix-server-type-metric-0.5-beta.jar /opt/solr/server/solr/chronix/lib

RUN mkdir -p /opt/solr/server/solr/historian/data/snapshot_metadata
RUN mkdir -p /opt/solr/server/solr/historian/data/index
COPY solr/historian /opt/solr/server/solr/historian

COPY scripts /opt/docker-solr/scripts
RUN chown -R $SOLR_USER:$SOLR_GROUP /opt/solr/server

EXPOSE 8983
WORKDIR /opt/solr
USER $SOLR_USER

#ENTRYPOINT ["docker-entrypoint.sh"]
CMD [ "sh", "-c", "/opt/solr/bin/solr start -m ${JAVA_MEMORY} && tail -f /dev/null"]

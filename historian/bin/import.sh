#!/usr/bin/env bash


CONF_FILE=${1}
DATA_FOLDER=${2:-data}

java -Dlog4j.configurationFile=conf/log4j2.xml -jar backend/target/historian-backend-0.1.0.jar  conf/${CONF_FILE} ${DATA_FOLDER}
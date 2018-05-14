#!/usr/bin/env bash



API_VERSION=${1:-v1}

cd backend
# -i http://localhost:8701/api/swagger.json
java -jar ../lib/swagger-codegen-cli-2.3.1.jar generate -l spring -i src/main/swagger/api-swagger.yml --group-id com.hurence.logisland --artifact-id historian --api-package com.hurence.logisland.historian.rest.${API_VERSION}.api --model-package com.hurence.logisland.historian.rest.${API_VERSION}.model -t src/main/swagger/templates     -DserializableModel=true


rm -rf src/main/java/io

sleep 1
cd ..
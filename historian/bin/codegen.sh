#!/usr/bin/env bash



API_VERSION=${1:-v1}


# -i http://localhost:8701/api/swagger.json
java -jar lib/swagger-codegen-cli-2.3.1.jar generate -l spring -i backend/src/main/swagger/api-swagger.yml --group-id com.hurence.logisland --artifact-id historian --api-package com.hurence.logisland.historian.rest.${API_VERSION}.api --model-package com.hurence.logisland.historian.rest.${API_VERSION}.model -t backend/src/main/swagger/templates     -DserializableModel=true

sleep 1


# Setup microservices with docker


Pre-requisites : Add the following line to your `/etc/hosts` files

    127.0.0.1       keycloak chronix redis historian


## Option A : all-in-one docker-compose

Run a compose stack 
    
    docker-compose -f src/main/docker/docker-compose.yml up

## Option B : start dependencies with docker and launch Historian from sources 

Run dependencies services ()redis/chronix & keycloak) in  Docker compose

    docker-compose -f src/main/docker/docker-compose-dev.yml up   

Run and build Logisland Historian
    
    # Checkout the source and build

    git clone git@github.com:Hurence/logisland.historian.git
    git hf init
    git hf feature checkout rest-api.#45

Run spring boot application on port 8701
    
    mvn clean spring-boot:run -DappPort=8701





## REST API generation with Swagger

Generate Java code : 

    ./codegen.sh

Get swagger.json doc

    curl -XGET http://localhost:8701/v2/api-docs




 keytool -genkey -alias logisland-historian -storetype PKCS12 -keyalg RSA -keysize 2048  -keystore keystore.p12 -validity 3650
 
 
 
Build and run historian as Docker container
 
    mvn -U -X package docker:build
    docker run -idt -p 8701:8701 -e appPort=8701 hurence/historian:latest

    mvn -U -X clean versions:set -DnewVersion=1.0.37
    mvn -U -X package docker:build -Dpush.image=true


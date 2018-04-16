Run spring boot application on port 8701
    
    mvn clean spring-boot:run -DappPort=8701


Get swagger.json doc

    curl -XGET http://localhost:8701/api/swagger.json


Run Keycloak as a docker service on port 8080
    
    docker run jboss/keycloak --id keycloak -p 8080:8080

    # add a admin user
    bin/add-user-keycloak.sh -u admin
    
    http://localhost:8080/auth


 keytool -genkey -alias logisland-historian -storetype PKCS12 -keyalg RSA -keysize 2048  -keystore keystore.p12 -validity 3650
 
 
 
Build and run historian as Docker container
 
    mvn -U -X package docker:build
    docker run -idt -p 8701:8701 -e appPort=8701 hurence/historian:latest



mvn -U -X clean versions:set -DnewVersion=1.0.37
mvn -U -X package docker:build -Dpush.image=true



TODO

docker compose
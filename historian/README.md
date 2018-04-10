mvn clean spring-boot:run

docker run jboss/keycloak --name keycloak -p 8080:8080

bin/add-user-keycloak.sh -u admin
http://localhost:8080/auth


 keytool -genkey -alias logisland-historian -storetype PKCS12 -keyalg RSA -keysize 2048  -keystore keystore.p12 -validity 3650
 
 
 
 
 
 mvn -U -X package docker:build

sudo docker run -idt -p 8701:8701 -e appPort=8701 hurence/historian:latest

mvn -U -X clean versions:set -DnewVersion=1.0.37
mvn -U -X package docker:build -Dpush.image=true


# Setup microservices with docker



## Option A : all-in-one docker-compose

Run a compose stack
    
    docker-compose -f src/main/docker/docker-compose.yml up

## Option B : start each docker service manually

Run a chronix docker container on port 8983

    docker run -p 8983:8983 --name chronix -d hurence/chronix:latest
    
Run a Redis docker container on port 8983  
    
    docker run -p 6379:6379 --name redis -d redis    


### setup Keycloak Security

https://developers.redhat.com/blog/2017/05/25/easily-secure-your-spring-boot-applications-with-keycloak/
 
Run Keycloak as a docker service on port 8080
    
    docker run  -p 8080:8080 --name keycloak -d jboss/keycloak

Attach to docker image an create an admin user

    # add a admin user
    bin/add-user-keycloak.sh -u admin

Login in with your admin user
    
    http://localhost:8080/auth
    
**create a realm**
Let’s navigate our mouse into the upper left upper corner to discover the “Create a Realm” button:
We’re naming it **logisland**

**create a client**
Now we’ll navigate to the Clients page. We need to add a client to our application, so we click “Create”. We’ll call the new Client **logisland-historian**.
we’ll be leaving all the defaults except the “Valid Redirect URIs field”. We’ll be redirected to the port 8701 : "http://localhost:8701/*"

**Creating a Role and a User**
Keycloak uses the Role-Based Access. Therefore, each user must have a role.
We need to navigate to the “Role” page, Then, we add the **user** role.
Now we’ve got a role that can be assigned to users, but there are no users yet. So let’s go the “Users” page and add one: logisland

 And finally, we need to set his credentials, so go to the credentials tab of your user and choose a password, I will be using “password” for the rest of this article, make sure to turn off the “Temporary” flag unless you want the user to have to change his password the first time he authenticates.
 
 Now proceed to the “Role Mappings” tab and assign the role “user”:



## Run and build Logisland Historian
    
Checkout the source and build

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


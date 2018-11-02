FROM openjdk:8-jdk-alpine
MAINTAINER hurence <support@hurence.com>, http://www.hurence.com

VOLUME /tmp

ARG JAR_FILE
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]

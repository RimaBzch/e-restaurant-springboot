#FROM openjdk:17
#WORKDIR /app
# Copy the application jar file
#COPY target/resto-0.0.1-SNAPSHOT.jar /app/
#EXPOSE 8082
#CMD ["java","-jar","/resto-0.0.1-SNAPSHOT.jar"]
#ADD target/resto-0.0.1-SNAPSHOT.jar resto-0.0.1-SNAPSHOT.jar
#ENTRYPOINT ["java","-jar","/resto-0.0.1-SNAPSHOT.jar"]


FROM openjdk:17
WORKDIR /app
COPY target/resto-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java","-jar","/app/app.jar"]
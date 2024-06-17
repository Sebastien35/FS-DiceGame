# Use the Maven image for building the project
FROM maven:3.9.7-eclipse-temurin-17 AS build

# Set the working directory
WORKDIR /app

# Copy the project files to the container
COPY . .

# Download dependencies and compile the project
RUN mvn clean package -DskipTests

# Debugging step: List the contents of the target directory to ensure the JAR file is there
RUN ls -l /app/target

# Use the JRE image for running the project
FROM eclipse-temurin:17-jre-jammy

# Set the working directory
WORKDIR /app

# Copy the compiled JAR file to the JRE image
COPY --from=build /app/target/dice-game-0.0.1-SNAPSHOT.jar /app/app.jar

COPY ./.env ./.env

RUN apt-get update && apt-get install -y bash
# Debugging step: List the contents of the /app directory to ensure the JAR file is there
RUN ls -l /app

# Expose port 8080
EXPOSE 8080

# Set the entry point to run the Java application
ENTRYPOINT ["bash", "-c", "source /app/.env && java -jar app.jar --spring.profile.active=docker "]

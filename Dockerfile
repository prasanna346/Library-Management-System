FROM gradle:8.5-jdk17 AS build
WORKDIR /app
COPY Backend /app/Backend
WORKDIR /app/Backend
RUN gradle build -x test --no-daemon

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/Backend/build/libs/*.jar app.jar
EXPOSE 8080
ENV PORT=8080
ENTRYPOINT [java, -Dserver.port=, -jar, app.jar]

# Override the location below with a private repo base path when using this build in CI (b/c Dockerhub now rate-limits pulls).
ARG REPO_LOCATION=''
FROM ${REPO_LOCATION}node:16.10-alpine

RUN apk update && apk add bash  && apk add curl

# Create app directory
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Install app dependencies
COPY --chown=node:node package*.json ./
USER node
RUN npm install

# If you are building your code for production, this will not install devDependencies
# RUN npm install --production

# Bundle app source
COPY --chown=node:node . .
RUN chmod +x ./run.sh

EXPOSE 3000
ENTRYPOINT [ "./run.sh" ]
FROM node:18-alpine

# Create app directory
RUN mkdir /redbicicletas-fe
WORKDIR /redbicicletas-fe

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /redbicicletas-fe/

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . /redbicicletas-fe

ARG REDBICICLETA_FE_PORT
ARG REDBICICLETA_BICICLETAS_PORT
ARG SECRET

ENV REDBICICLETA_FE_PORT=$REDBICICLETA_FE_PORT
ENV REDBICICLETA_BICICLETAS_PORT=$REDBICICLETA_BICICLETAS_PORT
ENV SECRET=$SECRET

EXPOSE 8040
CMD [ "npm", "start" ]
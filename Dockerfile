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

ARG FRONTEND_PORT
ARG SECRET

ENV FRONTEND_PORT=$FRONTEND_PORT
ENV SECRET=$SECRET

EXPOSE 5000
CMD [ "npm", "start" ]
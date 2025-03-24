FROM node:latest
WORKDIR /app
# COPY ./app/package*.json /app
# RUN npm install
RUN npm install -g nodemon
# COPY ./app /app
EXPOSE 3000
CMD ["nodemon", "index.js"]
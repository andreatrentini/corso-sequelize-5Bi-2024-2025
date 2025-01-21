FROM node:latest
WORKDIR /app
COPY ./app/package*.json /app
RUN npm install
COPY ./app /app
EXPOSE 3000
CMD ["node", "index.js"]
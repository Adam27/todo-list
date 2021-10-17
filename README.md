# Angular todo-list application

## Run build in Docker container
### Run in /todo-app directory
docker build -t todo-app-image:latest  .
docker run -d -p 4200:80 todo-app-image:latest

## Run application on local machine
### To run live server on local machine in /todo-app directory
ng serve

### To run build on local machine in /todo-app directory
ng build

## API documentation:
https://app.contentful.com/

## Demo:
http://adamov-todo.freecluster.eu/



# USer API Medium

## Data:
Example of a trade data JSON object:
```
{
   "id": 1,
   "firstName": "Abubakarr",
   "lastName": "Bangura",
   "email": "ib@gmail.com",
   "avatar": "//www.gravatar.com/avatar/eaafa6dfb090066ba7842b060d175a7c?s=200&r=pg&d=mm",
   "createdAt": "2022-06-29T09:26:45.667Z",
   "updatedAt": "2022-06-29T09:26:45.667Z"
}
```

## Project Specifications:
The model implementation is for basic user usecase.



The task is to implement the REST service that exposes the /users endpoint, which allows for managing the collection of user records in the following way:

- POST request to /users:
    - creates a new user
    - expects a JSON user object without the id and isPublished property as the body payload. You can assume that the given object is always valid.
    - a new user should always be created with isPublished property set to false
    - if the payload contains isPublished (either true or false) property, it should be disregarded and always set to false on object creation
    - adds the given user object to the collection of users and assigns a unique integer id to it. The first created user must have id 1, the second one 2, and so on.
    - the response code is 201, and the response body is the created user object

- GET request to /users:
    - return a collection of all users
    - the response code is 200, and the response body is an array of all user objects ordered by their ids in increasing order

- PATCH request to /users/<id>:
    - you can assume that the body sent to this patch request will always be {"isPublished" : true}
  

- DELETE, PUT request to /users/<id>:
    - the response code is 405 because the API does not allow deleting or modifying users for any id value

You should complete the given project so that it passes all the test cases when running the provided unit tests. The project by default supports the use of the SQLite3 database.

## Environment 
- Node Version: ^12.18.2
- Default Port: 8000

**Read Only Files**
- `test/*`

**Commands**
- run: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm start
```
- install: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm install
```
- test: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm test
```

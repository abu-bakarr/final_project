# Products API Medium

## Data:
Example of a trade data JSON object:
```
{
   "id":1,
   "name": "Premium Roast Coffee",
   "price": 1.19,
   "mrp": 1.19,
   "stock": 1,
   "isPublished": false
}
```

## Project Specifications:
The model implementation is for basic product usecase.



The task is to implement the REST service that exposes the /products endpoint, which allows for managing the collection of product records in the following way:

- POST request to /products:
    - creates a new product
    - expects a JSON product object without the id and isPublished property as the body payload. You can assume that the given object is always valid.
    - a new product should always be created with isPublished property set to false
    - if the payload contains isPublished (either true or false) property, it should be disregarded and always set to false on object creation
    - adds the given product object to the collection of products and assigns a unique integer id to it. The first created product must have id 1, the second one 2, and so on.
    - the response code is 201, and the response body is the created product object

- GET request to /products:
    - return a collection of all products
    - the response code is 200, and the response body is an array of all product objects ordered by their ids in increasing order

- PATCH request to /products/<id>:
    - you can assume that the body sent to this patch request will always be {"isPublished" : true}
  

- DELETE, PUT request to /products/<id>:
    - the response code is 405 because the API does not allow deleting or modifying products for any id value

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

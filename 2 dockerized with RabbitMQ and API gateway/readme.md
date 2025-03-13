## infracture
The following describe the implementation of a version of the movie database based on microservices. The architecture is outlined in architecture.png

The API gateway serves as the entry point to the application. It takes care of central issues such as user registration. This ensures that not every service needs to authenticate the users themselves. The API gateway communicates with the various services, requests the information, and generates the response to the client.

The movie service is connected via a synchronous communication link. It’s implemented with Express and a MySQL backend. The user service is implemented as an asynchronous service with a connection to a message queue. MongoDB is used here as the backend.
Both the services and the API gateway each run in a Docker container. For this application, we assume that it’s a single-page application and that the services only need to render JavaScript Object Notation (JSON) data. You can use Postman as a frontend. These tools fulfill the role of the browser in which the frontend of the application is executed.

## Asynchronous Microservice with RabbitMQ

The first microservice of the application works asynchronously, that is, relatively strongly decoupled. The user service isn’t an ideal example here because communication via a message queue such as RabbitMQ also entails a potential time delay due to the strong decoupling. 
However, this example nicely illustrates the bidirectional and thus equal communication between the services as well as the resulting problems.
The direct question-answer pattern implemented in this example is rather unusual for an asynchronous service, and a common web protocol such as HTTP would work just as well, if not better, for the implementation.        
Message queues are typically used in places where the request is decoupled from the response. Take, for example, the creation of a new user account. In this case, users enter their data via the frontend and send the request to an API gateway, and then the gateway sends the message on to the message queue. 
Once the message is submitted there, users will be notified that the request was successfully received. Then, the system processes the message by reading it from the message queue, creating the account, and informing users, for example, by email, that the account can be activated via a separate link. The message queue here ensures that the message about the creation of a new account is processed in any case. 
For example, if the user service crashes during creation, the message isn’t acknowledged and is processed again once the service is restarted or another instance of the service processes the message.

###  Docker Setup
Implemented the first microservice of the application with this source code. To be able to start it, need to boot the MongoDB instance, the RabbitMQ server, and the actual user service. This can be done by starting each of these services in their own Docker container. To avoid having to start the containers individually by hand, integrate them into the docker-compose configuration.

##  API Gateway
The API gateway brings together the individual microservices of the application. This has the advantage that the clients of the application don’t communicate with multiple endpoints, but only with one central gateway, which can handle the internal distribution of requests and, in this role, is able to distribute the loads. 
In addition, the API gateway plays a security-critical role by hiding the internal structure of the microservice application from the outside world.
It also handles central tasks such as authentication and, if necessary, scheduling of encrypted communication. 
Depending on the requirements, communication within the microservice application can also take place unencrypted on a secured network.

### Connecting the User Service 
### package.json
The API gateway is an Express application that has a model-view-controller (MVC) structure. However, instead of communicating directly with a database in the models, query the respective microservices at this point. Store the files of this service in the api directory parallel to the user directory.
Initialize the API gateway in the first step via the npm init command to create a package.json file. Then you install Express and the uuid and amqplib packages using the npm install express uuid amqplib command.

### index.js
In the API gateway, provide a separate module in a separate subdirectory for each service that can be communicated with to decouple the application as much as possible. The router of the user module defines the public interface with which the clients of the application can communicate. 
For the current development state of the application, only two routes are needed: one to query all user data and one to create users. Save the router in the api/user/index.js

### Asynchronous Communication with the User Service
now, have to work with a very decoupled type of communication.
For a normal database or web service that you address via HTTP, can use promises or callback functions. In this case, however, can send a message to the message queue, which is accepted by the user service and answered at a later time. Because the model is primarily concerned with communication, this is the first place need to worry about exchanging information with the message queue. In api/user/model.js, you send a message over the message queue within the getAll and the create function each, which is accepted and processed by the user service.

The central element of the model implementation is the communication with the message queue. So,you need to handle this method of information exchange. 

The core of the implementation is the connect.js file in the api directory. It’s responsible for connecting to the message queue and provides functions you can use to process the asynchronous messages.

In the API gateway, save the response objects of the user requests in an object structure named registry with the id of the message as the key. If a message is received from the user service via the message queue, you can extract the response object from the registry object and send the data received from the user service to the user as a JSON response. 
To secure the communication, you can include time-outs. 
If a message is received and takes longer to process than the specified time-out value, the receiver throws an exception. In the code example, caching the response objects is done by calling the register function in the controller, whereas responding to the request is done using the answer function you call inside the registerHandler function.

### Authentication
Because microservices don’t care about authentication, need to implement the autherntication in the API gateway. Depending on how you implement your application, can choose from different mechanisms. 
In this context, the authentication via JSON web tokens (JWTs) has become widely used.
You install the packages required for JWT authentication in the API gateway, that is, in the api directory, using the npm install jsonwebtoken express-jwt command. Then you create a new file named auth.js containing the routes relevant for authentication.

The logic behind the login route works a bit differently.
you need the user data, but the requesting user should receive a token and not the user list. Consequently, you make sure that you can register a callback function in addition to the response object. In api/connect.js, you already benefit from this modification and register such a callback function, which then takes care of sending the response to the user.

The integration of an authentication process now enables you to assign requests to your application to specific users and filter the delivered results accordingly. For this purpose, you need to pass this information to the individual microservices. In the simplest case, this can be done by using parameters in the request. Alternatively, you can implement a central user service that microservices can request. For this to work, the API gateway passes the user’s identification as a token to the microservice, which has the token resolved by the central user service and thus receives the user information.

## Synchronous Microservice with Express

The second microservice you implement for your application is the movie service. This is a classic Express application that can be accessed via HTTP. The difference with the Express applications you’ve developed so far is that the movie service has a higher level of specialization. This microservice only takes care of all tasks related to the movie database, that is, reading and writing records as well as validating them. In this section, you implement read-only and create-only access for all create, read, update, delete (CRUD) operations as examples.

### Integration into the API Gateway
To integrate the movie microservice into the API gateway, you must first install the request package using the npm install request command. Then you extend the entry file with the entry to the movie module, which you must also secure against unauthorized access. For this purpose, you use the express-jwt command. refere to api/index.js for the code.

## Differences among the 2 microservices
The biggest difference between the user and movie modules can be found in the implementation of the model, which, in both cases, provides a promise interface to the outside world. In the case of the user model, communication is asynchronous via a message queue. With the movie module, you use synchronous communication via HTTP requests. I
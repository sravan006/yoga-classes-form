# yoga-classes-form

This project is about creating a form for yoga class registrations.
This is a web application, it stores the user information and payment details and the batch they chose
Tech-Stack used : Node.js, React.js, Express.js, MYSQL database

## features
- A user once paid for a batch in a specific month can't pay again
- validates age and mobile no.
- It won't add a user to database again if he already exists 

## installation

- git clone the repository and cd to formforyoga
 - connect your database in config/dbconfig.js
- to start frontend use `npm start`
- to start the backend use `nodemon server.js`

## usage 

- As you complete the installation and start the servers, you will see a webpage you can fill the form to store your details in the database
- It uses a mock Make Payment function which dosen't actually does any payments but add the user to the database if dosen't exit already

## Database

- I used a mysql database, database name `yoga classes`
- It consists of two tables `users` and `payments`

- ER Diagram of my database

![Local Image](./public/Screenshot%202023-12-20%20at%2012.23.25%E2%80%AFAM.png)


## images of my executions and database

- user interface 

![Local Image](./public/Screenshot%202023-12-19%20at%2011.34.46%E2%80%AFPM.png)

- validating age and mobile number

![Local Image](./public/Screenshot%202023-12-19%20at%2011.36.15%E2%80%AFPM.png)

- payment successful page

![Local Image](./public/Screenshot%202023-12-19%20at%2011.36.56%E2%80%AFPM.png)

- if same user tries to book a same slot twice it shows an error

![Local Image](./public/Screenshot%202023-12-19%20at%2011.37.22%E2%80%AFPM.png)

- This is my user table

![Local Image](./public/Screenshot%202023-12-19%20at%2011.37.54%E2%80%AFPM.png)

- This is my payments table

![Local Image](./public//Screenshot%202023-12-19%20at%2011.38.06%E2%80%AFPM.png)



# yoga-classes-form
# yoga-classes-form

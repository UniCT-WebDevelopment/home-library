<p align="center">
<img src="./doc/shared-books.png"  width="170" height="200" >
</p>

<h1 align="center"> Home Library  </h1>

### Introduction

<p>
This project has been designed for web programming class at University of Catania .The  goal of this application is help people to managing and organising Book's collection in their home. It will help users to create libraries and split them into shelf. Also you can add book into your library typing just ISBN of the book.
</p>

### Motivations

If in your house you have a plenty of books, maybe will be tedious find out where is the book that you would like read right now. Also, libraries could have different size and you want to split up in bookshelves. This applications helps to do it you can :

- Create your account.
- Sign in.
- Add library.
- Add bookshelf.
- Add book and assign it to bookshelf.
- Filter all your books and understand where is book you are looking for.
- Share your book's list with your friends.

### Getting started (BE)

Make sure to have:

- [NodeJS](https://nodejs.dev/)

- [MongoDB](https://www.mongodb.com/)

First of all you have to clone the repo:

```sh
git clone https://github.com/borgesis95/home-library.git
cd home-library
```

Install dependencies:

```sh
npm run install
```

Into the folder you can find `env.example` file which you can update in order to setup your local environment

```sh
cp .env.example .env
```

Start application with :

```sh
- npm run start:client  # In order to run just react client app

- npm run start:server # Run just server side app

- npm run:all # run client and server

- npm run:prod # launch a build for client app and run the server
```

### Getting started (FE)

Make sure to properly configured backend side .

First of all you need to clone the repo

```sh


cd client
```

Install dependecies :

```sh
npm run install
```

Start application with :

```sh
npm run start
```

### Folders structure

`./src` contain follow folders.

```

./src
├── client          # contain client (react) application
├── @types          # tpyes extensions for TS.
├── config          # configuration file for logging (winston) and passport
├── controllers     # This folder container books, library, and User controller.
├── middlewares     # There are two middleware which handles error and authentication
├── models          # Mongoose schemas.
├── routes
├── services        # Files on it , handles BL of the application.
└── utils           # utils Function.

```

### API

All API are available as postman collection here [Postman-collection](https://github.com/borgesis95/home-library-backend/blob/main/doc/Home-Library.postman_collection.json).

### Main features

- **Logging**: For the logging within this app has been used [winston](https://github.com/winstonjs/winston) which is logging library where you can customize log visualization.

- **Errors handling:** Express already has its default error-handling middleware, however i decided to add a pretty straightforward custom middleware that log errors inside `error.log`.

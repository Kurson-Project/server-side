# Getting Started

## Introduction

This project is a Node.js application built with the following dependencies:

* **cors**: Handles Cross-Origin Resource Sharing (CORS).
* **dotenv**: Manages environment variables.
* **express**: A web framework for Node.js.
* **jsonwebtoken**: For creating and verifying JSON Web Tokens (JWT).
* **prisma orm** : For database orm

## Prerequisites

Before starting, ensure you have the following installed:

* **Node.js** (v16 or later)
* **Potgresql** latest version

## Installation

1. Clone the repository:

``` bash
git clone <repository-url>
cd <repository-folder>
```

2. Install the dependencies:

``` bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root of your project with the following variables:

``` env
APP_PORT=3000
APP_DEBUG = true/false
APP_KEY = <your jwt secret>
DB_URL = ...
```

## Running the Project

1. Start the development server:

``` bash
npm start
```

2. Open your browser or API client and access the server at:

```
http://localhost:3000
```

## Use Rest API

Indonesian Documentation Warning!

1. User sign-up
gunakan method POST `/auth/signup`

``` json
   {
      "body" : {
         "username" : "",
         "user_email" : "",
         "user_password": "",
      }
   }
```

2. User Login
gunakan method POST `/auth/login`, keberhasilan login akan memberikan kode token untuk disimpan client sebagai **authentikasi** selanjutnya , kode ini berlaku di semua routes yang perlu **authentikasi.**

``` json
   {
      "body" : {
         "username" : "",
         "password" : ""
      }
   }
```

jika login berhasil maka token akan dikirim kan langsung di response body

```json
{
    "status": 200,
    "message": "",
    "data": {
        "token": <JWT TOKEN>
    }
}
```
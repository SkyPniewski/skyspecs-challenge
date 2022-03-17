# SkySpecs Software Engineer Coding Challenge - Skylar Pniewski

Additional build requirements are listed below after given prerequisites

Time taken to complete this challenge: 4 hours

# Getting Started

## Prerequisites

- Node.js
- npm

[https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Installation

### Server

1. Navigate to the server directory

```bash
cd skyspecs-starter/server
```

2. Install necessary dependencies

```bash
npm i
```

#### Database

A quick way to get a database instance running:

1. Install [docker](https://www.docker.com/)
2. Run an instance of the official postgres docker image (and expose the port for connecting to it)
```bash
docker run --name my-pg -p 5432:5432 -e POSTGRES_PASSWORD=superSecretPassword -d postgres
```
3. (Optional) Verify the instance is running
```bash
docker ps # (You should see your instance named my-pg in the output)
```
4. You should now be able to connect to your database using the connection string: `postgresql://postgres:superSecretPassword@localhost:5432/postgres`

5. Inside the server directory run migrate to create the necessary table
```bash
node migrate
```

### Client

1. Navigate to the client directory. If you’re already in the server directory:

```bash
cd ../client
```

otherwise:

```bash
cd skyspecs-starter/server
```

1. Install necessary dependencies

```bash
npm i
```

2. Run the application

```bash
npm run start
```

### ADDITIONAL BUILD REQUIREMENT - AFTER SERVER AND DATABASE

1. Navigate to the server directory, run a migrate to create the necessary database table
```bash
node migrate
```

2. Run the application
```bash
npm run start
```
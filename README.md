# Test Library

### Table of Contents
**[Getting Started](#getting-started)**

- **[Deployment](#deployment)**
- **[Configure and Install dependencies](#configure-and-install-dependencies)**
- **[Run worker](#run-worker)**
- **[Run development](#run-development)**

**[Technologies](#technologies)**

### Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system. You can also view the Postman collection by opening the file `postman_collection.json`

#### Deployment

1. Clone this repository on your machine
2. Install dependencies and create your environment configuration file from example:
   ```shell script
   make build 
   ```
3. Set config data to `default.json` file
4. Run the seeders
   ```shell script
   yarn seed
   ```
5. Run the app
   ```shell script
   yarn start
   ```

#### Configure and Install dependencies

```
make build
```

#### Run worker

```
yarn start
```

#### Run development

```
yarn dev
```

### Technologies
1. [Node.js](https://nodejs.org/)
2. [MySQL](https://www.mysql.com/)

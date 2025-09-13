# To Get Up And Running! | SETUP

STEP 1 - Run 'npm install' to install backend packages

STEP 2 - Run 'npm run install-client' to install react and frontend packages

STEP 3 - Add a .env file in the root directory and add the following variables:

```
MONGODB_URI
AUTH0_AUDIENCE
AUTH0_ISSUER
NODE_ENV
REACT_APP_AUTH0_DOMAIN
REACT_APP_AUTH0_CLIENT_ID
REACT_APP_AUDIENCE
REACT_APP_ENV
```

STEP 4 - Add a duplicate of this exact .env file to the client folder.

STEP 5 - Run 'npm start' to run the server

STEP 6 - Run 'npm run client' to boot the frontend. From here you should see the app come up.

DONE!


# MERN TEMPLATE
--- 

### Overview
This is my personal template to start mern projects which will optimize as I learn. This template is set up to host the code in git and the live app in heroku. 

### Contains
**Backend**
- Server
- Routes
- Models
- Controllers
- Mongodb connection (commented out)
- Hygen templates
- Api route protection

**Frontend**
- Sass templates
- Auth0 (commented out)
- Basic components
- Bootstrap
- Moment.js
- Axios

### General Setup
- First things first, run `yarn` in root directory and then `cd client` and run `yarn` there too.
- `yarn dev` - runs server and client locally
- `yarn client` - runs client only
- `yarn start` - runs server
- `yarn storybook` - runs client storybook 

### Mongodb Setup
- Create a mongodb database
- Uncomment lines in server and change connection string in .env
- Add routes, controllers, models, etc.

### Auth0 Setup
- Follow basic auth0 documentation and setup to start...
- Add auth0 variables to .env and uncomment lines in index.js and app.js
- Make sure routes in server have jwt api route protection (May need to uncomment some lines)








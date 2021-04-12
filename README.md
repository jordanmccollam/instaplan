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








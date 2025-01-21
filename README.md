# Logisitcs

## Note:

- I do not have any experience sharing my web development code with anyone and I am not sure what is conventionally shared to make this process smooth. The frontend and backend communicate smoothly when run locally on my computer. Please let me know if there are any issues with getting the app to run. Thank you!
  -- email: yunijlee0731@gmail.com

## Backend

- Configuration details for the database is contained in backend/config/db-config.js. Please change the password and any other details specific to you.
- The port is set to 3001, which is defined in the backend/.env file. You can also directly change the port number in backend/server.js by modifying line 29 (const port = process.env.PORT || 3001;)

- How to run:

  > cd to <your file path>/inventory-app/backend -> Run the command `npm install` -> Run the command `npm run dev` or `npm start`

- Details about the database:
  -- The database name is "inventory_db"
  -- Two tables were created: Users, Items

## Frontend

- How to run:
  > cd to <your file path>/inventory-app/frontend -> Run the command `yarn install` -> Run the command `yarn start`

# Credential Locker App

This is an app that I have made that is a credential Storage App. IT stores credentials for divisions that are part of Operational Units. This app has user permissions so that only users with specific attributes can see specific Credentials

## How to Use

Once you have the application running you can register a new user - This user will automatically have a normal role assigned in the registration you can pick what divisions and operational Units you want the user to have access to - Once you have registered a user you can login  - THis user will only be able to add and view credentials (Of the credentials you have chosen). 
If you would like to edit a credential you would need a user role of manager or admin - Admin are the only user that can change other users information - If you want to test this you can logout and login with 
Username : Gareth
Password : Gazza 
Then navigate to users and edit the users role you wish to change - Logout and log back in with the newly changed user 
This user can Now edit credentials provided their role is now management or Admin  

### `Set Up`

Once you have downloaded the repo you can use npm install on both server and client/locker files to install the needed dependencies.
Then user NPM start on both server and client/locker to start the app.


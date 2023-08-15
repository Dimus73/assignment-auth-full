# assignment-auth-full

=== Cloning the project: ===

1. Open the terminal.
2. Create a folder to store the homework (md test).
3. Enter this folder (cd test).
4. Execute the project cloning (git clone …).

=== Starting the server: ===

1. Enter the folder assignment_auth_serv (cd assignment_auth_serv).
2. Create a virtual environment (python3 -m venv venv).
3. Enter the virtual environment (source venv/bin/activate).
4. Initialize all packages (pip install -r requirements.txt).
5. Create a .env file. It will contain necessary database connection settings and a secret key for token generation.
   Here's an example of the file:
   DB_URL=localhost
   DB_PORT=5432
   DB_USERNAME=dmitryprigozhin
   DB_PASSWORD=1
   DB_NAME=auth_base
   SECRET_KEY = 'your_secret_key'
6. Start the server with the command (python3 app.py).

=== Launching the application (frontend): ===

1. Enter the folder assignment_auth_serv (cd assignment_auth_front).
2. Install the packages (npm install).
3. Unpack the need_to_unpack.zip file. It contains the certificate files (cert.pem and key.pem) required to run the
   application using the HTTPS protocol in development mode. HTTPS is necessary for cookies to work correctly!
   Files should be in the folder (assignment_auth_front).
4. Start the application (npm start).
   !Important: This project implements user authentication via two tokens.
   This approach requires the use of the HTTPS protocol. When launched for the first time (development mode), CHROME gives a warning about an unsafe connection. This is normal since the launch uses self-signed certificates.
   Furthermore, to test the access token reissue mechanism, you need to disable the <React.StrictMode> wrapper in the index.js file. This is not required to check the project's other functions.

=== Database ===

For the application to function, a specific database structure is required. There are two solutions:

1. Create a database based on the application's existing models (Migration):
   1.1. Create a new database.
   1.2. Specify its parameters in the .env file.
   1.3. Navigate to the assignment_auth_serv folder in the terminal.
   1.4. Execute the following commands:

   - export FLASK_APP=app.py (For MacOS)
   - set FLASK_APP=app.py (For Windows)
   - flask db init
   - flask db migrate -m "Initial migration."
   - flask db upgrade

2. Use the backup of the test database. The file is located at assignment_auth_serv/test_auth.nb3.

=== Application Functionality ===

Upon the application's first launch, only the "New User" option will be available to you.
You need to register and log in via "Login". After that, you can:

- Create your own companies using "Company".
- Add previously registered users to any of your companies using "User to Company".
- Add new users through "New User".

=== Technical Details of the Project ===

Considering this project is for verification, the provided code is somewhat excessive for the
task at hand. I assumed that the given task is part of a larger overall mission. The written
code will assist in implementing subsequent functionalities.

The following endpoints are implemented server-side:

/signup (post) - User registration.
/signin (post) - User authorization by providing two tokens (access and refresh). The refresh token is passed via a cookie.
/signout (post) - User logout.
/refresh (get) - Token refresh.
/users (get) - Retrieve a list of all users.
/create-org (post) - Create a new organization.
/owner-org-list (post) - List all organizations created by the user.
/add-user-to-org - Add a user to an organization.
/users-in-org (post) - List all users added to an organization.
A check has been implemented to validate email addresses and passwords.
(Password validation conditions are currently commented out in the code for easier testing).

On the client side, in addition to the main functions, an automatic mechanism for restoring the
access token based on the refresh token has been implemented. The code has been maximally decomposed
to simplify further development. A userHook has been created to handle API requests. It manages the data
loading indicator display and handles emerging errors.

# RestApiWithCSharp
A CRUD REST Api made with ASP.NET core plus Entity Framework for the backend, and React for the front end. This app also implements JWT authentication and uses a SQL Docker container for a database.

**Setup**

1. Clone the repo from Github using:

```
git clone https://github.com/AndrewKhoo1/RestApiWithCSharp.git
```

2. For Mac users, start a SQL Docker container instance. More info on how to do this can be found here: https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-ver15&pivots=cs1-bash.

4. Windows users can use SQL Management Studio to spin up a local SQL Database.

5. Connect the project to the SQL database generated in steps 4/5 by updating the "ConnectionStrings" property in the appsettings.Development.json file.

6. Start the Rest Api project in your IDE of choice.

7. Cd into the directory containing the React project and spin up the React part of the app by using:

```
 npm start
```
    
8. Once the React app starts, the product list will initially be empty due to JWT Authentication. Click on the "GetJwt" button to retrieve a new JWT token on https://localhost:5001/api/products.

9. Finally, feel free to create, delete, or update any products.



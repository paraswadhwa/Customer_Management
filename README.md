Customer Management Project

 Steps to run the project -

 1. Go to server folder and run npm install, it will fetch all the 
    modules required from package.json file.
 2. Type node app.js in the command prompt and hit enter.
    It will start running the server at port 3000.
 2. Go on any web browser and type 'http://localhost:3000/'.
 	It will display our application and will land you on the view customer page.

 Add Customer Module -

 1. Currently there will be no customers.
 2. Click on the 'Add Customer' Link in the side menu and start filling 
    out the form with all the details being mandatory.
 3. You can dynamically add 1 or more addresses for the customer.
 4. After filling all the details,if all fields are matched after 
    validation submit button will be enabled.
 5. Click on the submit button to save your customer details.

 View Customer Module -

 1. This will display all the customer details created by you in the form  
    of a table
 2. Search button on the top right will help you to filter records on the 
    basis of a no. of fields such as name,mobile,phone,email.
 3. Clicking on the delete button corresponding to any row will delete the 
    customer from the database.
 4. Click on edit button will take you to the add form with all your 
    details prefetched. You can change any value inside that and click submit , which will update your values.

 Report Module -

 1. This will display all customers along with many other details fetched 
    on the basis of some conditions and calculations.
 2. Aggregation framework($lookup) is used here to fetch data from 
    multiple collections.
 3. Amount and average amount are calculated after applying some formulas.

 Run Script Button on View Customer Module-

 Pre condition : You should click this button when there are at least 2  				 customers.As bill generation requires customer id from 			    customer table.

 1. Click on this button will generate 1000 bills.
 2. Bills generated will have dynamic values of multiple fields.
 3. Customer Id will be fetched randomly from the customer table.
 4. Bill number will contain an auto incremented field value.
 5. Menu Items are fetched randomly from 1 to 10.
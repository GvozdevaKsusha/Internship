using plane.parts as plane from '../db/schema';

service UserService @(requires: 'authenticated-user') {

    entity Users as projection on plane.Customers;

    action register(firstName: String, lastName: String, email: String, password: String) returns String;
    
    action login(email: String, password: String) returns String;
}

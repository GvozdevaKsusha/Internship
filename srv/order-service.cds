using plane.parts as orders from '../db/schema';

service OrderService {
    
    entity Customers as projection on orders.Customers;
    
    entity Parts as projection on orders.Parts;
    
    entity Orders as projection on orders.Orders;
    
    entity OrderItems as projection on orders.OrderItems;
    
    action placeOrder(customerID: UUID, items: OrderItemInput) returns Orders;
}

type OrderItemInput {
    partID: UUID;
    quantity: Integer;
}

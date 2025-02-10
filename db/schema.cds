namespace plane.parts;
using {managed, Currency} from `@sap/cds/common`;

entity Customers {
    key ID          : UUID;
    companyName       : String;
    email           : String;
    phone          : String;
    address        : String;
    orders         : Association to many Orders on orders.customer = $self;
}

entity Parts {
    key ID          : UUID;
    name           : String;
    description    : String;
    price         : Decimal(10,2);
    currency      : Currency;
    stock         : Integer;
}

entity Orders : managed {
    key ID          : UUID;
    customer       : Association to Customers;
    orderDate      : DateTime;
    status        : String enum { Pending; Confirmed; Shipped; Delivered; Canceled };
    totalAmount   : Decimal(10,2);
    currency      : Currency;
    items         : Association to many OrderItems on items.order = $self;
}

entity OrderItems {
    key ID          : UUID;
    order         : Association to Orders;
    part          : Association to Parts;
    quantity     : Integer;
    price        : Decimal(10,2);
    currency     : Currency;
}


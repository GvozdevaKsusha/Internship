const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
    const { Orders, OrderItems, Parts, Customers } = this.entities;

    this.on('createOrder', async (req) => {
        const { customerID, items } = req.data;

        const order = {
            ID: cds.utils.uuid(),
            customer_ID: customerID,
            orderDate: new Date(),
            status: 'Pending',
            totalAmount: 0
        };
        let total = 0;
        for (const item of items) {
            const part = await SELECT.one.from(Parts).where({ ID: item.part });
            if (!part) req.reject(404, `Part ${item.part} not found`);

            total += part.price * item.quantity;

            await INSERT.into(OrderItems).entries({
                ID: cds.utils.uuid(),
                order_ID: order.ID,
                part_ID: item.part,
                quantity: item.quantity,
                price: part.price,
                currency: part.currency
            });
        }

        order.totalAmount = total;

        await INSERT.into(Orders).entries(order);

        return order;
    });
});

const cds = require('@sap/cds');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = cds.service.impl(async function () {
    const { Customers } = this.entities;

    this.on('register', async (req) => {
        const { firstName, lastName, email, password } = req.data;

        const existingUser = await SELECT.one.from(Customers).where({ email });
        if (existingUser) return req.reject(400, 'User already exists');

        const hashedPassword = await bcrypt.hash(password, 10);

        await INSERT.into(Customers).entries({
            ID: cds.utils.uuid(),
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        return "User registered successfully";
    });

    this.on('login', async (req) => {
        const { email, password } = req.data;

        const user = await SELECT.one.from(Customers).where({ email });
        if (!user) return req.reject(401, 'Invalid email or password');

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return req.reject(401, 'Invalid email or password');

        const token = jwt.sign({ id: user.ID, email: user.email }, 'secret', { expiresIn: '1h' });

        return token;
    });
});

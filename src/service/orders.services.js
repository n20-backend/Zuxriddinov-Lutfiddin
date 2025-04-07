import client from "../db/index.js";

export const getAllOrders = async () => {
    try {
        const result = await client.query('SELECT * FROM orders');
        console.log(result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const getOrderById = async (id) => {
    try {
        const result = await client.query(
            'SELECT id, transportid AS "transportId", userid AS "userId", startdate AS "startDate", enddate AS "endDate", status, totalamount AS "totalAmount", currency, created_at, updated_at FROM orders WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            throw new Error('Buyurtma topilmadi!');
        }

        return result.rows; 
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
};



export const createOrder = async (body) => {
    try {
        console.log("Yangi buyurtma uchun kiritilgan ma'lumotlar:", body);

        const transportId = body.transportid;
        const userId = body.userid;
        const startDate = body.startdate;
        const endDate = body.enddate;
        const status = body.status;
        const totalAmount = parseFloat(body.totalamount); 
        const currency = body.currency;

        if (
            !transportId ||
            !userId ||
            !startDate ||
            !endDate ||
            !status ||
            totalAmount === undefined ||
            !currency
        ) {
            throw new Error("Please ensure all fields are filled!");
        }

        const result = await client.query(
            `INSERT INTO orders (
                transportid, userid, startdate, enddate, status, totalamount, currency
            ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [transportId, userId, startDate, endDate, status, totalAmount, currency]
        );

        return result.rows[0];
    } catch (error) {
        console.error("Buyurtma yaratishda xatolik:", error.message);
        throw error;
    }
};



export const updateOrder = async (id, body) => {
    const oldOrder = await getOrderById(id);

    if (!oldOrder || oldOrder.length === 0) {
        throw new Error('Buyurtma topilmadi');
    }
    
    
    const currentDate = new Date();

    const updatedOrder = {
        transportId: body.transportId || oldOrder[0].transportId,
        userId: body.userId || oldOrder[0].userId,
        startDate: body.startDate || oldOrder[0].startDate,
        endDate: body.endDate || oldOrder[0].endDate,
        status: body.status || oldOrder[0].status,
        totalAmount: body.totalAmount || oldOrder[0].totalAmount,
        currency: body.currency || oldOrder[0].currency,
        updated_at: currentDate
    };

    const result = await client.query(
        `UPDATE orders SET
            transportid = $1,
            userid = $2,
            startdate = $3,
            enddate = $4,
            status = $5,
            totalamount = $6,
            currency = $7,
            updated_at = $8
        WHERE id = $9 RETURNING *`,
        [
            updatedOrder.transportId,
            updatedOrder.userId,
            updatedOrder.startDate,
            updatedOrder.endDate,
            updatedOrder.status,
            updatedOrder.totalAmount,
            updatedOrder.currency,
            updatedOrder.updated_at,
            id
        ]
    );

    return result.rows[0];
};

export const deleteOrder = async (id) => {
    try {
        const result = await client.query('DELETE FROM orders WHERE id = $1 RETURNING id', [id]);
        console.log(id);
        
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting order:', error);
        throw error;
    }
};




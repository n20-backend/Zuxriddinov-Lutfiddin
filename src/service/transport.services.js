import client from '../db/index.js';

export const getAllTransports = async () => {
    const result = await client.query('SELECT * FROM transport');
    return result.rows;
};

export const getTransportById = async (id) => {
    const result = await client.query('SELECT * FROM transport WHERE transport_id = $1', [id]);
    return result.rows[0];
};

export const createTransport = async (data) => {
    const newTransport = { ...data };

    if (
        !newTransport.registrationNumber || 
        !newTransport.type || 
        !newTransport.make || 
        !newTransport.model || 
        !newTransport.year || 
        !newTransport.status
    ) {
        throw new Error("Transport yaratishda maydonlar to'liq emas!");
    }

    const result = await client.query(
        `INSERT INTO transport (
            registrationNumber, type, make, model, year, status
        ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [
            newTransport.registrationNumber, 
            newTransport.type, 
            newTransport.make, 
            newTransport.model, 
            newTransport.year, 
            newTransport.status
        ]
    );

    return result.rows[0];
};


export const updateTransport = async (id, data) => {
    const old = await getTransportById(id);
    if (!old) return null;
    console.log(old.year);
    const updated = {
        registrationnumber: data.registrationnumber || old.registrationnumber,
        type: data.type || old.type,
        make: data.make || old.make,
        model: data.model || old.model,
        year: data.year || old.year,
        status: data.status || old.status
    };

    const result = await client.query(
        `UPDATE transport SET
            registrationNumber = $1,
            type = $2,
            make = $3,
            model = $4,
            year = $5,
            status = $6,
            updated_at = CURRENT_TIMESTAMP
         WHERE transport_id = $7 RETURNING *`,
        [
            updated.registrationnumber,
            updated.type,
            updated.make,
            updated.model,
            updated.year,
            updated.status,
            id
        ]
    );

    return result.rows[0];
};

export const deleteTransport = async (id) => {
    const result = await client.query('DELETE FROM transport WHERE transport_id = $1 RETURNING *', [id]);
    return result.rows[0];
};

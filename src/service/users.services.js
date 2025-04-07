import client from "../db/index.js"

export const getAllUsers = async () => {
    try {
        const result = await client.query('SELECT * FROM users'); 
        console.log(result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        const result = await client.query('SELECT * FROM users WHERE user_id = $1', [id]);
        return result.rows; 
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

export const createUser = async (body) => {
    try {
        const newUser = { ...body}
        if(!newUser.email || !newUser.user_name || !newUser.password || !newUser.role || !newUser.status ){
            throw new Error("Foydalanuvchi yaratishda maydonlar to'liq emas!")
        }

        
        const hashedPassword = await bcrypt.hash(newUser.password, 10);

        const result = await client.query(
            `INSERT INTO users (email, user_name, password, role, status) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
            [newUser.email, newUser.user_name, hashedPassword, newUser.role, newUser.status]
        );

        return result.rows

    }catch(error){
        console.log(error);
    }
}

export const updateTransport = async (id, body) => {
    try {
        const oldTransportQuery = 'SELECT * FROM transport WHERE transport_id = $1';
        const oldTransportResult = await client.query(oldTransportQuery, [id]);
        const oldTransport = oldTransportResult.rows[0];

        if (!oldTransport) {
            throw new Error("Transport topilmadi");
        }

        const updatedTransport = {
            registrationNumber: body.registrationNumber || oldTransport.registrationNumber,
            type: body.type || oldTransport.type,
            make: body.make || oldTransport.make,
            model: body.model || oldTransport.model,
            year: body.year || oldTransport.year,
            status: body.status || oldTransport.status,
            updated_at: new Date().toISOString() // Yangilangan sana
        };

        const query = `UPDATE transport SET 
            registrationNumber = $1, 
            type = $2, 
            make = $3, 
            model = $4, 
            year = $5, 
            status = $6,
            updated_at = $7
            WHERE transport_id = $8 
            RETURNING *`;

        const values = [
            updatedTransport.registrationNumber, 
            updatedTransport.type, 
            updatedTransport.make, 
            updatedTransport.model, 
            updatedTransport.year, 
            updatedTransport.status, 
            updatedTransport.updated_at, 
            id
        ];

        // So'rovni yuborish
        const result = await client.query(query, values);
        const transport = result.rows[0];

        return transport;
    } catch (error) {
        console.error("Error updating transport:", error);
        throw error;
    }
};


export const deleteUser = async (id) => {
    try {
        const result = await client.query('DELETE FROM users WHERE user_id = $1 RETURNING user_id', [id]);
        console.log(id);
        
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

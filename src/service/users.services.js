import client from "../db/index.js"
import bcrypt from "bcrypt";

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

export const updateUser = async (id, body) => {
    try {
        const oldUserRows = await getUserById(id);
        const oldUser = oldUserRows[0];

        if (!oldUser) {
            throw new Error("Foydalanuvchi topilmadi");
        }

        // Parolni alohida tekshirib, hash qilish
        let updatedPassword = oldUser.password;
        if (body.password && body.password !== oldUser.password) {
            updatedPassword = await bcrypt.hash(body.password, 10);
        }

        const updatedUser = {
            email: body.email || oldUser.email,
            user_name: body.user_name || oldUser.user_name,
            password: updatedPassword,
            role: body.role || oldUser.role,
            status: body.status || oldUser.status,
            updated_at: new Date().toISOString()
        };

        const query = `UPDATE users SET 
            email = $1,
            user_name = $2,
            password = $3,
            role = $4,
            status = $5,
            updated_at = $6
            WHERE user_id = $7
            RETURNING *`;

        const values = [
            updatedUser.email,
            updatedUser.user_name,
            updatedUser.password,
            updatedUser.role,
            updatedUser.status,
            updatedUser.updated_at,
            id
        ];

        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating user:", error);
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

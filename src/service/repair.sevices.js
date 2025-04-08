import client from "../db/index.js"

export const getAllRepair = async () => {
    try {
        const result = await client.query('SELECT * FROM repair'); 
        console.log("jadval malumotlari", result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const getRepairById = async (id) => {
    try {
        const result = await client.query('SELECT * FROM repair WHERE id = $1', [id]);
        return result.rows; 
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

export const createRepair = async (body) => {
    try {
        const newRepair = { ...body };

        // Maydonlar to'liq ekanini tekshiramiz
        if (!newRepair.transportid || !newRepair.description || !newRepair.cost || !newRepair.date || !newRepair.status) {
            throw new Error("Ta'mirlash ma'lumotlari to'liq emas!");
        }

        // Ta'mirlashni jadvalga kiritamiz
        const result = await client.query(
            `INSERT INTO repair (transportid, description, cost, date, status) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
            [newRepair.transportid, newRepair.description, newRepair.cost, newRepair.date, newRepair.status]
        );

        return result.rows;

    } catch (error) {
        console.log(error);
        throw new Error("Ta'mirlash yaratishda xatolik yuz berdi");
    }
};

export const updateRepair = async (id, body) => {
    try {
        // Eski ta'mirlashni olish
        const oldRepairResult = await getRepairById(id);

        // Agar natija bo'lmasa, xatolikni qaytarish
        if (!oldRepairResult || oldRepairResult.length === 0) {
            throw new Error("Ta'mirlash topilmadi");
        }

        const oldRepair = oldRepairResult[0]; // oldRepairResult bo'sh emasligini tekshirgandan keyin, birinchi elementni olish

        const updatedRepair = {
            transportid: body.transportid || oldRepair.transportid,
            description: body.description || oldRepair.description,
            cost: body.cost || oldRepair.cost,
            date: body.date || oldRepair.date,
            status: body.status || oldRepair.status,
            updated_at: new Date().toISOString()
        };

        const query = `UPDATE repair SET 
            transportid = $1, 
            description = $2, 
            cost = $3, 
            date = $4, 
            status = $5, 
            updated_at = $6 
            WHERE id = $7 
            RETURNING *`;

        const values = [
            updatedRepair.transportid,
            updatedRepair.description,
            updatedRepair.cost,
            updatedRepair.date,
            updatedRepair.status,
            updatedRepair.updated_at,
            id
        ];

        const result = await client.query(query, values);
        const repair = result.rows[0];

        return repair;
    } catch (error) {
        console.error("Error updating repair:", error);
        throw new Error("Ta'mirlashni yangilashda xatolik yuz berdi");
    }
};

export const deleteRepair = async (id) => {
    try {
        const result = await client.query('DELETE FROM repair WHERE id = $1 RETURNING id', [id]);
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



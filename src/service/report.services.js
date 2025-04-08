import client from "../db/index.js";

export const getAllReport = async () => {
    try {
        const result = await client.query('SELECT * FROM report'); 
        console.log("Jadval ma'lumotlari:", result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error fetching reports:', error);
        throw error;
    }
};

export const getReportById = async (id) => {
    try {
        const result = await client.query('SELECT * FROM report WHERE id = $1', [id]);
        return result.rows; 
    } catch (error) {
        console.error('Error fetching report:', error);
        throw error;
    }
}

export const createReport = async (body) => {
    try {
        const newReport = { ...body };
        console.log(body);
        

        // Maydonlar to'liq ekanini tekshiramiz
        if (!newReport.transportid || !newReport.title || !newReport.description ) {
            throw new Error("Report ma'lumotlari to'liq emas!");
        }

        // Reportni jadvalga kiritamiz
        const result = await client.query(
            `INSERT INTO report (transportid, title, description) 
            VALUES ($1, $2, $3) RETURNING *`, 
            [newReport.transportid, newReport.title, newReport.description]
        );

        return result.rows;

    } catch (error) {
        console.log(error);
        throw new Error("Report yaratishda xatolik yuz berdi");
    }
};

export const updateReport = async (id, body) => {
    try {
        // Eski reportni olish
        const oldReportResult = await getReportById(id);

        // Agar natija bo'lmasa, xatolikni qaytarish
        if (!oldReportResult || oldReportResult.length === 0) {
            throw new Error("Report topilmadi");
        }

        const oldReport = oldReportResult[0]; // oldReportResult bo'sh emasligini tekshirgandan keyin, birinchi elementni olish

        const updatedReport = {
            transportid: body.transportid || oldReport.transportid,
            title: body.title || oldReport.title,
            description: body.description || oldReport.description,
            created_at: body.created_at || oldReport.created_at,
            updated_at: new Date().toISOString()
        };

        const query = `UPDATE report SET 
            transportid = $1, 
            title = $2, 
            description = $3, 
            created_at = $4, 
            updated_at = $5 
            WHERE id = $6 
            RETURNING *`;

        const values = [
            updatedReport.transportid,
            updatedReport.title,
            updatedReport.description,
            updatedReport.created_at,
            updatedReport.updated_at,
            id
        ];

        const result = await client.query(query, values);
        const report = result.rows[0];

        return report;
    } catch (error) {
        console.error("Error updating report:", error);
        throw new Error("Reportni yangilashda xatolik yuz berdi");
    }
};

export const deleteReport = async (id) => {
    try {
        const result = await client.query('DELETE FROM report WHERE id = $1 RETURNING id', [id]);
        console.log(id);
        
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting report:', error);
        throw error;
    }
};

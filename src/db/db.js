import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pkg.Pool({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "transport",
    password: process.env.DB_PASSWORD || "lznroma",
    port: process.env.DB_PORT || 5432
});

pool.connect((err) => {
    if(err){
        console.error(err)
    } else {
        console.log("zor")
    }
})

export default pool; // ✅ Default eksport qo'shildi

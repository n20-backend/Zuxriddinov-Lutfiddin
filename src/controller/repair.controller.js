import * as repairServices from '../service/repair.sevices.js';  
import { RepairValidation } from "../validations/repair.validation.js"; // Validatsiya importi


export const getAllRepair = async (req, res) => {
    try {
        const repairs = await repairServices.getAllRepair();
        res.json(repairs);
    } catch (error) {
        console.error('Error fetching repairs:', error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
    }
};

export const getRepairById = async (req, res) => {
    const { id } = req.params;
    try {
        const repair = await repairServices.getRepairById(id);
        if (repair && repair.length > 0) {
            res.json(repair[0]); 
        } else {
            res.status(404).json({ error: 'Ta\'mirlash topilmadi' });
        }
    } catch (error) {
        console.error('Error fetching repair by ID:', error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
    }
};


export const createRepair = async (req, res) => {
    const body = req.body;

    const { error } = RepairValidation(body);
    if (error) {
        return res.status(400).json({
            message: "Kiritilgan ma'lumotlarda xatolik bor",
            errors: error.details.map((err) => err.message)
        });
    }

    try {
        const newRepair = await repairServices.createRepair(body);
        res.status(201).json(newRepair);
    } catch (err) {
        console.error('Error creating repair:', err);
        res.status(500).json({ error: 'Ta\'mirlash yaratishda xatolik yuz berdi' });
    }
};

export const updateRepair = async (req, res) => {
    const body = req.body;
    const { id } = req.params;

    // Validatsiya
    const { error } = RepairValidation(body);
    if (error) {
        return res.status(400).json({
            message: "Kiritilgan ma'lumotlarda xatolik bor",
            errors: error.details.map((err) => err.message)
        });
    }

    try {
        const repair = await repairServices.updateRepair(id, body);
        if (repair) {
            res.status(200).json(repair);
        } else {
            res.status(404).json({ error: 'Ta\'mirlash topilmadi' });
        }
    } catch (error) {
        console.error('Error updating repair:', error);
        res.status(500).json({ error: 'Ta\'mirlashni yangilashda xatolik yuz berdi' });
    }
};


export const deleteRepair = async (req, res) => {
    const { id } = req.params; 
    try {        
        const user = await repairServices.deleteRepair(id);
        console.log(user);
        
        if (!user) {
            return res.status(400).send("repair topilmadi!❌");  
        }
        res.status(200).send("repair delete successfully✅");  
    } catch (error) {
        console.log(error);
        res.status(400).send("Xatolik yuz berdi!");      }
};

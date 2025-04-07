import * as repairservices from "../service/repair.sevices.js"

export const getAllRepair = async (req, res) => {
    try {
        const users = await repairservices.getAllRepair();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
    }
};

export const getRepairById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await repairservices.getRepairById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
    }
}

export const createRepair = async (req, res) => {
    const body = req.body
    try {
        const newRepair = await repairservices.createRepair(body);
        res.status(201).json(newRepair);
    } catch (err) {
        console.log(err);
        res.status(500).send('Xatolik');
    }
};

import * as repairServices from '../service/repair.services.js';  

export const updateRepair = async (req, res) => {
    const body = req.body;
    const { id } = req.params;

    try {
        
        const repair = await repairServices.updateRepair(id, body);

        if (repair) {
            res.status(200).json(repair);  
        } else {
            res.status(404).json({ error: 'Ta\'mirlash topilmadi' });  
        }
    } catch (error) {
        console.log("Error updating repair:", error);
        res.status(400).json({ error: 'Ta\'mirlashni yangilashda xatolik' });  
    }
};

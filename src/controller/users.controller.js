import * as userServices from "../service/users.services.js"

export const getAllUsers = async (req, res) => {
    try {
        const users = await userServices.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
    }
};
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userServices.getUserById(id);
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

export const createUser = async (req, res)=> {
    const body = req.body;
    try{
        const user = await userServices.createUser(body);
        if(user){
            res.status(201).send(user);
        }
    }catch(error) {
        console.log(error);
        res.status(400).send("user yaratishda xatolik")
    }
}

export const updateUser = async (req, res) => {
    const body = req.body;
    const { id } = req.params;

    try {
        const user = await userServices.updateUser(id, body);
        if (user) {
            res.status(200).json(user); 
        } else {
            res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
        }
    } catch (error) {
        console.log("Error updating user:", error);
        res.status(400).json({ error: 'Foydalanuvchini yangilashda xatolik' });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params; 
    try {        
        const user = await userServices.deleteUser(id);
        console.log(user);
        
        if (!user) {
            return res.status(400).send("User topilmadi!❌");  
        }
        res.status(200).send("User delete successfully✅");  
    } catch (error) {
        console.log(error);
        res.status(400).send("Xatolik yuz berdi!");      }
};
import * as orderServices from "../service/orders.services.js"

export const getAllOrders = async (req, res) => {
    try {
        const users = await orderServices.getAllOrders();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
    }
};

export const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await orderServices.getOrderById(id);
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

export const createOrder = async (req, res)=> {
    const body = req.body;
    try{
        const user = await orderServices.createOrder(body);
        if(user){
            res.status(201).send(user);
        }
    }catch(error) {
        console.log(error);
        res.status(400).send("order yaratishda xatolik")
    }
}

export const updateorder = async (req, res) => {
    const body = req.body;
    const { id } = req.params;

    try {
        const user = await orderServices.updateOrder(id, body);
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

export const deleteOrder = async (req, res) => {
    const { id } = req.params; 
    try {        
        const user = await orderServices.deleteOrder(id);
        console.log(user);
        
        if (!user) {
            return res.status(400).send("User topilmadi!❌");  
        }
        res.status(200).send("User delete successfully✅");  
    } catch (error) {
        console.log(error);
        res.status(400).send("Xatolik yuz berdi!");      }
};
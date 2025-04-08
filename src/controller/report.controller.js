import * as reportServices from '../service/report.services.js';  

export const getAllReport = async (req, res) => {
    try {
        const reports = await reportServices.getAllReport();
        res.json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
    }
};

export const getReportById = async (req, res) => {
    const { id } = req.params;
    try {
        const report = await reportServices.getReportById(id);
        if (report && report.length > 0) {
            res.json(report[0]); 
        } else {
            res.status(404).json({ error: 'Report topilmadi' });
        }
    } catch (error) {
        console.error('Error fetching report by ID:', error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
    }
};

export const createReport = async (req, res) => {
    const body = req.body;
    try {
        const newReport = await reportServices.createReport(body);
        res.status(201).json(newReport);
    } catch (err) {
        console.error('Error creating report:', err);
        res.status(500).json({ error: 'Report yaratishda xatolik yuz berdi' });
    }
};

export const updateReport = async (req, res) => {
    const body = req.body;
    const { id } = req.params;

    try {
        const report = await reportServices.updateReport(id, body);
        if (report) {
            res.status(200).json(report);  
        } else {
            res.status(404).json({ error: 'Report topilmadi' });  
        }
    } catch (error) {
        console.error('Error updating report:', error);
        res.status(500).json({ error: 'Reportni yangilashda xatolik yuz berdi' });  
    }
};

export const deleteReport = async (req, res) => {
    const { id } = req.params; 
    try {        
        const user = await reportServices.deleteReport(id);
        console.log(user);
        
        if (!user) {
            return res.status(400).send("Report topilmadi!❌");  
        }
        res.status(200).send("Report o'chirildi ✅");  
    } catch (error) {
        console.log(error);
        res.status(400).send("Xatolik yuz berdi!");      
    }
};

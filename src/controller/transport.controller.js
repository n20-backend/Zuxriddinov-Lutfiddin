import * as transportService from '../service/transport.services.js';

export const getAllTransports = async (req, res) => {
    try {
        const transports = await transportService.getAllTransports();
        res.status(200).json(transports);
    } catch (err) {
        res.status(500).send('Xatolik yuz berdi');
    }
};

export const getTransportById = async (req, res) => {
    try {
        const transport = await transportService.getTransportById(req.params.id);
        if (!transport) return res.status(404).send('Topilmadi');
        res.status(200).json(transport);
    } catch (err) {
        res.status(500).send('Xatolik');
    }
};

export const createTransport = async (req, res) => {
    try {
        const newTransport = await transportService.createTransport(req.body);
        res.status(201).json(newTransport);
    } catch (err) {
        res.status(500).send('Xatolik');
    }
};

export const updateTransport = async (req, res) => {
    try {
        const updated = await transportService.updateTransport(req.params.id, req.body);
        if (!updated) return res.status(404).send('Topilmadi');
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).send('Xatolik');
    }
};

export const deleteTransport = async (req, res) => {
    try {
        const deleted = await transportService.deleteTransport(req.params.id);
        if (!deleted) return res.status(404).send('Topilmadi');
        res.status(200).send("O'chirildi");
    } catch (err) {
        res.status(500).send('Xatolik');
    }
};

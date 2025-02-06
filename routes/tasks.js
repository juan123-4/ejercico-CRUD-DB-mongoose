const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Crear una tarea
router.post('/create', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Hubo un problema al crear la tarea" });
    }
});
//{"title": "Nueva task2"} colocar en postman.body-raw

// Traer todas las tareas
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).send(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Hubo un problema al obtener las tareas" });
    }
});

// Buscar tarea por ID
router.get('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findById(req.params._id);
        if (!task) return res.status(404).send({ message: "Tarea no encontrada" });
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Hubo un problema al obtener la tarea" });
    }
});

// Marcar tarea como completada
router.put('/markAsCompleted/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params._id, { completed: true }, { new: true });
        if (!task) return res.status(404).send({ message: "Tarea no encontrada" });
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Hubo un problema al actualizar la tarea" });
    }
});

// Actualizar título de una tarea
router.put('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params._id, { title: req.body.title }, { new: true });
        if (!task) return res.status(404).send({ message: "Tarea no encontrada" });
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Hubo un problema al actualizar la tarea" });
    }
});

// Eliminar una tarea
router.delete('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params._id);
        if (!task) return res.status(404).send({ message: "Tarea no encontrada" });
        res.status(200).send({ message: "Tarea eliminada con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Hubo un problema al eliminar la tarea" });
    }
});

module.exports = router;

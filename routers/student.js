const express = require('express');
const bodyParser = require('body-parser');
const StudentModel = require('../models/student');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Lấy danh sách sinh viên
app.get('/students', async (req, res) => {
    try {
        const students = await StudentModel.getAllStudents();
        res.json(students);
    } catch (error) {
        console.error('Cannot get student list:', error);
        res.status(500).send('Cannot get all student');
    }
});

// Thêm sinh viên mới
app.post('/students', async (req, res) => {
    const { id, name, age } = req.body;
    try {
        const response = await StudentModel.addStudent(id, name, age);
        res.json({ message: 'Student add successfully', id });
    } catch (error) {
        console.error('Cannot add student', error);
        res.status(500).send('Cannot add student');
    }
});

// Xóa sinh viên
app.delete('/students/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await StudentModel.deleteStudent(id);
        res.json({ message: 'Delete student successfully', id });
    } catch (error) {
        console.error('Cannot delete student', error);
        res.status(500).send('Cannot delete student');
    }
});

// Cập nhật sinh viên
app.put('/students/:id', async (req, res) => {
    const id = req.params.id;
    const { name, age } = req.body;
    try {
        const response = await StudentModel.updateStudent(id, name, age);
        res.json({ message: 'Student update successfully', id });
    } catch (error) {
        console.error('Cannot update student', error);
        res.status(500).send('Cannot update student');
    }
});

module.exports = app;

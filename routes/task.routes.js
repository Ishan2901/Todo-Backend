const express = require('express');
const taskController = require('../controllers/task.controller');
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); 
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}-${file.originalname}`); 
    },
  });
  
  const upload = multer({ storage });

router.post('/', upload.single("pdf"), taskController.createTaskController);
router.get('/', taskController.getAllTasksController);
router.get('/:id', taskController.getTaskByIdController);
router.patch('/:id', taskController.updateTaskController);
router.delete('/:id', taskController.deleteTaskController);

module.exports = router;
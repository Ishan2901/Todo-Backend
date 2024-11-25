const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title : {
       type : String,
       required : true,
       trim : true
    },
    description : {
        type: String,
        required: true, 
        trim: true
    },
    status : {
       type : String,
       enum : ['TODO', 'DONE'],
       default : 'TODO'
    },
    linkedFileType : {
       type : Buffer,
       contentType : String
    },
    createdOn : {
       type : Date,
       required : true,
       default : Date.now
    },
    deadline : {
       type : Date,
       required : true
    }
})

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task
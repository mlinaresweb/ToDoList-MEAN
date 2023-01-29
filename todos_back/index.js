'use strict'

const express = require('express');

const cors = require ('cors');

const morgan = require ('morgan');

const app = express();

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({extended:false}));

const Items = require('./tasks/routes/task.routes');

Items.taskRoutes(app);

app.listen(53514, 'localhost', () => {
    console.log('Server listening on port %s', 53514)
})

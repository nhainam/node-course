const debug = require('debug')('app:startup');
const config = require('config');
const logger = require('./logger');
const Joi = require('joi');
const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.use(express.urlencoded());
app.use(express.static('public'));
app.use(logger);

if (app.get('env') === 'development') {
    console.log('Logging is enabled...');
    debug('Morgan enabled...');
}


console.log('Application Name: ' + config.get('name'));
console.log('Email Server: ' + config.get('mail.host'));
console.log('Email Password: ' + config.get('mail.password'));

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
]

app.get('/', (req, res) => {
    res.render('index', {title:'My Express App', message: 'Hello'});
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found'); 
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found'); 

    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found'); 

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourse(course)
{
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
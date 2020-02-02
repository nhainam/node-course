
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27018/mongo-exercises', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Courses', courseSchema);

async function getCourses() {
    
    const courses = await Course
        .find({ isPublished: true, tags: 'backend' })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });

    console.log(courses);
};

async function run() {
    await getCourses();
}

run();
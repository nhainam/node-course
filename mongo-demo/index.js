
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27018/playground', {useNewUrlParser: true, useUnifiedTopology: true})
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

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'fontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}
// createCourse();

async function getCourse() {
    const pageNumber = 2;
    const pageSize = 10;
    
    const courses = await Course
        .find({ author: 'Mosh', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
        .count();
    console.log(courses);
};

getCourse();


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27018/playground', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function (v, callback) {
                return v && v.length > 0;
            },
            message: "A course should have at least one tag."
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10, 
        max: 20,
        set: v => Math.round(v),
        get: v => Math.round(v),
    }
});

const Course = mongoose.model('Courses', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: "web",
        author: 'Mosh',
        tags: ['FrontEnd'],
        isPublished: true,
        price: 11.5
    });
    
    try {
        const result = await course.save();
        console.log(result);
    } 
    catch (ex)  {
        for(field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }
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
        .select({ name: 1, tags: 1, price: 1 });
    console.log(courses);
};

getCourse();

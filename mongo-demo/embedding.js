const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27018/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String, 
  authors: [authorSchema]
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.findById(courseId);
  course.author.name = "Nam Nguyen"
  course.save(); 
}

async function updateAuthor2(courseId) {
  const course = await Course.update({ _id: courseId }, {
    // $set: {
    //   "author.name": "Nam Nguyen 2"
    // }
    $unset: {
      "author": ""
    }
  });
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function deleteAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}
// createCourse('Node Course', [
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'Nam' })]);

// updateAuthor2("5e364c13e38def19c845af32");
// addAuthor("5e366a2d1efcf6275e7bbf6b", new Author({ name: "Na Na" }));
deleteAuthor("5e366a2d1efcf6275e7bbf6b", "5e366d09b7bebf28ca00b4c0");

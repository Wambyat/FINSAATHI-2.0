const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const SECRET = 'SECr3t';  // This should be in an environment variable during deployment.

// Define mongoose schemas
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
});

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean,
    lessons: [{type: mongoose.Schema.Types.ObjectId, ref: 'Lesson'}],
    quizzes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'}]
});

const lessonSchema = new mongoose.Schema({
    title: String,
    description: String,
    videoLink: String,
    imageLink: String,
    text: String
});

const quizSchema = new mongoose.Schema({
    title: String,
    description: String,
    questions: [{
        question: String,
        imageLink: String,
        options: [{
            optionId: Number,
            option: String
        }],
        correctAnswer: Number
    }]
});

// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);
const Lesson = mongoose.model('Lesson', lessonSchema);
const Quiz = mongoose.model('Quiz', quizSchema);

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        // console.log(token);
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Connect to MongoDB
mongoose.connect('mongodb+srv://sohoxic:iisc@deez-nu.eyz6xx9.mongodb.net/', {
    dbName: "courses"
});

// Admin login and signup routes
app.post('/admin/signup', (req, res) => {
    const {username, password} = req.body;

    function callback(admin) {
        if (admin) {
            res.status(403).json({message: 'Admin already exists'});
        } else {
            const obj = {username: username, password: password};
            const newAdmin = new Admin(obj);
            newAdmin.save();
            const token = jwt.sign({username, role: 'admin'}, SECRET, {expiresIn: '1h'});
            res.json({message: 'Admin created successfully', token});
        }

    }

    Admin.findOne({username}).then(callback);
});

app.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
});


// Admin course CRUD routes
app.post('/admin/courses', authenticateJwt, async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json({message: 'Course created successfully', courseId: course.id});
});

app.put('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {new: true});
    if (course) {
        res.json({message: 'Course updated successfully'});
    } else {
        res.status(404).json({message: 'Course not found'});
    }
});

app.get('/admin/courses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({});
    res.json({courses});
});

app.delete('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
    const course = await Course.findByIdAndDelete(req.params.courseId);
    if (course) {
        res.json({message: 'Course deleted successfully'});
    } else {
        res.status(404).json({message: 'Course not found'});
    }
});


// Admin lesson CRUD routes
app.post('/admin/lessons', authenticateJwt, async (req, res) => {
    const lesson = new Lesson(req.body);
    await lesson.save();
    res.json({message: 'Lesson created successfully', courseId: lesson.id});
});

app.put('/admin/lessons/:lessonId', authenticateJwt, async (req, res) => {
    const lesson = await Lesson.findByIdAndUpdate(req.params.lessonId, req.body, {new: true});
    if (lesson) {
        res.json({message: 'Lesson updated successfully'});
    }
    else {
        res.status(404).json({message: 'Lesson not found'});
    }
});

app.get('/admin/lessons', authenticateJwt, async (req, res) => {
    const lessons = await Lesson.find({});
    res.json({lessons});
});

app.delete('/admin/lessons/:lessonId', authenticateJwt, async (req, res) => {
    const lesson = await Lesson.findByIdAndDelete(req.params.lessonId);
    if (lesson) {
        res.json({message: 'Lesson deleted successfully'});
    } else {
        res.status(404).json({message: 'Lesson not found'});
    }
});


// Admin quiz CRUD routes
app.post('/admin/quizzes', authenticateJwt, async (req, res) => {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.json({message: 'Quiz created successfully', courseId: quiz.id});
});

app.put('/admin/quizzes/:quizId', authenticateJwt, async (req, res) => {
    const quiz = await Quiz.findByIdAndUpdate(req.params.quizId, req.body, {new: true});
    if (quiz) {
        res.json({message: 'Quiz updated successfully'});
    } else {
        res.status(404).json({message: 'Quiz not found'});
    }
});

app.get('/admin/quizzes', authenticateJwt, async (req, res) => {
    const quizzes = await Quiz.find({});
    res.json({quizzes});
});

app.delete('/admin/quizzes/:quizId', authenticateJwt, async (req, res) => {
    const quiz = await Quiz.findByIdAndDelete(req.params.quizId);
    if (quiz) {
        res.json({message: 'Quiz deleted successfully'});
    } else {
        res.status(404).json({message: 'Quiz not found'});
    }
});


// User login and signup routes
app.post('/users/signup', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (user) {
        res.status(403).json({message: 'User already exists'});
    } else {
        const newUser = new User({username, password});
        await newUser.save();
        const token = jwt.sign({username, role: 'user'}, SECRET, {expiresIn: '1h'});
        res.json({message: 'User created successfully', token});
    }
});

app.post('/users/login/', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
});


// User course routes
app.get('/users/courses', authenticateJwt, async (req, res) => {
    try {
        const user = await User.findOne({username: req.user.username }).populate('purchasedCourses');
        if (user) {
            res.json({ purchasedCourses: user.purchasedCourses || [] });
        } else {
            res.status(403).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

app.get('user/courses/:courseId', authenticateJwt, async (req, res) => {
    // Check if user has purchased the course
    const user = await User.findOne({username: req.user.username}).populate('purchasedCourses');
    const course = await Course.findById(req.params.courseId);
    if (course) {
        res.json({ course });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

app.post('/users/courses/:courseId', authenticateJwt, async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    console.log(course);
    if (course) {
        const user = await User.findOne({username: req.user.username});
        if (user) {
            user.purchasedCourses.push(course);
            await user.save();
            res.json({message: 'Course purchased successfully'});
        } else {
            res.status(403).json({message: 'User not found'});
        }
    } else {
        res.status(404).json({message: 'Course not found'});
    }
});


// Courses endpoints
app.get('/courses', async (req, res) => {
    const courses = await Course.find({published: true});
    res.json({courses});
});

app.get('/courses/:courseId', async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    if (course) {
        res.json({course});
    } else {
        res.status(404).json({message: 'Course not found'});
    }
});

app.get('/courses/:courseId/quizzes', async (req, res) => {
    const quizzes = await Quiz.find({course: req.params.courseId});
    res.json({quizzes});
});

app.listen(3000, () => console.log('Server running on port 3000'));

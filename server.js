const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const courses = [
  { id: 1, course: "course1" },
  { id: 2, course: "course2" },
  { id: 3, course: "course3" },
];
//create a middleware for the json
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.get("/api/courses", (req, res) => {
  res.send(courses);
});
//getting one course
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === Number(req.params.id));
  if (course) {
    res.send(course);
  } else {
    res.status(404).send(`course with id of ${req.params.id} is not found`);
  }
});
app.post("/api/courses", (req, res) => {
  const course = {
    id: courses.length + 1,
    course: req.body.course,
  };
  courses.push(course);
  res.send(course);
});
app.listen(PORT, () => console.log(`Listing on port ${PORT}`));

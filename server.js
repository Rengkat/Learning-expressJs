const express = require("express");
const Joi = require("joi");
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
    return res.status(404).send(`course with id of ${req.params.id} is not found`);
  }
});
app.post("/api/courses", (req, res) => {
  //   const schema = {
  //     name: Joi.string().min(3).required(),
  //   };
  //   const result = schema.validate(req.body);
  //   console.log(result);
  if (!req.body.name || req.body.name.length < 3) {
    //send res with status 400: bad req
    return res.status(400).send("Please enter a valid name");
  }
  const course = {
    id: courses.length + 1,
    course: req.body.name,
  };
  courses.push(course);
  res.send(course);
});
//put
app.put("/api/course/:id", (req, res) => {
  //get the course
  const course = courses.find((c) => c.id === Number(req.params.id));

  //check if it exist in the courses
  if (!course) {
    return res.status(400).send("Course not exist");
  }
  //validate
  if (!req.body.name || req.body.name.length < 3) {
    //send res with status 400: bad req
    return res.status(400).send("Please enter a valid name");
  }

  // update
  course.name = req.body.name;
  res.send(course);
});
//delete
app.delete("/api/courses/:id", (req, res) => {
  //get the specific course
  const course = courses.find((c) => c.id === Number(req.params.id));
  if (!course) {
    return res.status(404).send("Course not found");
  }
  //get course using index
  const index = course.indexOf(course);
  course.splice(index, 1);
  res.send(course);
});
app.listen(PORT, () => console.log(`Listing on port ${PORT}`));

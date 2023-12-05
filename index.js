import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const todos = [];
const todosCompleted = [];

app.use(express.static("public/"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { todos, todosCompleted });
});

app.post("/submit", (req, res) => {

  const newData = req.body.text;
  todos.push(newData);
  console.log("aktuelle Arrayliste: " + todos);

  res.redirect('/');

});

app.post("/remove", (req, res) => {

  const newData = req.body.text;
  todosCompleted.push(newData);
  console.log("completed Arrayliste: " + todosCompleted);

  // Remove the element with value from the body from the array
  removeElementFromArray(todos, newData);
  console.log("new Arrayliste: " + todos);

  res.redirect('/');

});

app.post("/delete", (req, res) => {

  const newData = req.body.text;

  // Remove the element with value from the body from the array
  removeElementFromArray(todosCompleted, newData);
  console.log("new completed Arrayliste: " + todosCompleted);

  res.redirect('/');

});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


// Function to find and remove an element from the array
function removeElementFromArray(arr, element) {
  const index = arr.indexOf(element);

  if (index !== -1) {
    arr.splice(index, 1);
    console.log(`Element ${element} removed from the array ${arr}.`);
  } else {
    console.log(`Element ${element} not found in the array ${arr}.`);
  }
}

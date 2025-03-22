const express = require("express");
const app = express();
const port = 8080;
const { v4: uuidv4 } = require("uuid");
var methodOverride = require("method-override");

const path = require("path");

app.use(express.urlencoded({ extended: true })); // for parsing post requests
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); //to access views from any directory
app.use(express.static(path.join(__dirname, "public"))); // to access public from any directory

let posts = [
  {
    id: uuidv4(),
    username: "Yash_Samdaria",
    content: "I love coding",
    image:
      "https://media.licdn.com/dms/image/v2/D4E03AQEbOxpuFANynQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718321600260?e=1747872000&v=beta&t=cIFcJYslnHVwvzaY92Q1kCvpHtE_NA4kaJ3gMNAKEWE",
  },
  {
    id: uuidv4(),
    username: "Sourav Bhatt",
    content: "I love cooking",
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQGW2TY6KkdWVg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1672599982126?e=1747872000&v=beta&t=E9fJtq9kPZHZNkWHcm8hfU6nPeQ3CLww7HrllSkKLHY",
  },
  {
    id: uuidv4(),
    username: "Syed Asif Hussain Madni",
    content: "I am Vice chairman of BMSCE COMSOC",
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQE2B5MbcrPZAA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1723388140550?e=1747872000&v=beta&t=6rkmztwR9FGYMq9TyTxQpX6FG4xLc0gOhwOWFsZMvqE",
  },
];
app.listen(port, (req, res) => {
  console.log("Listenting to port : 8080 ");
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let id = uuidv4();
  let { username, content, image } = req.body;
  posts.push({ id, username, content, image });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;

  let post = posts.find((p) => id === p.id);

  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newcontent = req.body.content;
  let newimage = req.body.image;
  let post = posts.find((p) => id === p.id);
  post.content = newcontent;
  post.image = newimage;
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

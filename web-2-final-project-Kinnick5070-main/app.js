const port = 8080; // We'll run the server on port 8080

// IMPORTS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {getBlogList, convertMarkdown} = require("./modules/markdown-helpers")
const pathToBlogFolder = __dirname + '/blog/';

// MIDDLEWARE
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/css",express.static("./node_modules/bootstrap/dist/css"));
app.use("/js",express.static("./node_modules/bootstrap/dist/js"));


// Redirect to HTTPS
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
       if (req.headers['x-forwarded-proto'] !== 'https')
          // the statement for performing our redirection
          return res.redirect('https://' + req.headers.host + req.url);
       else
          return next();
    }else{
       return next();
    }
});

// ROUTES
app.get('/', (req, res) => {
    res.render('home', {
        title: "My Home Page"
    });
});

app.get('/blog', (req, res)=>{
    const blogList = getBlogList(pathToBlogFolder);
    res.render('blog-list', {
      title: "Blog",
      posts: blogList
    });
});

app.get("/blog/:post", (req, res) => {
    try{
      const pathToFile = pathToBlogFolder + req.params.post + ".md";
      console.log("Markdown file: " + pathToFile);
      const obj = convertMarkdown(pathToFile);
      res.render('blog-post', {
         title: obj.data.title,
         description: obj.data.description,
         author: obj.data.author,
         published: obj.data.published,
         content: obj.html
      });
    }catch(error){
      console.log(error);
      res.status(404).redirect("/404");
    }
});

app.get('/contact', (req, res) => {
    res.render('contact', {
       title: "Contact Me"
    });
});

app.post('/signup-confirmation', (req, res) => {

  // import the addUser function
  const {addUser} = require("./modules/user-helpers");

  // destructure the req.body object into individual variables
  const {firstName, lastName, email, password, confirmPassword} = req.body;

  // make sure that all required data has been sent
  if(firstName && lastName && email && password && confirmPassword){
    // make sure the passwords match
    if(password === confirmPassword){
      // If everything is valid, then add the new user
      addUser({firstName, lastName, email, password});
      res.send("Thank you for signing up!")
    }else{
      res.send("Invalid form submit - Passwords do not match!")
    }
  }else{
   res.send("Invalid form submit - All fields are required!");
  }
});

app.get('/login', (req, res) => {
  res.render('login-layout', {
     title: "Log In"
  });
});

app.post('/login', (req, res) => {

  // import the login() function
  const {login} = require("./modules/user-helpers");

  // destructure the req.body object to get the email and password from it
  const {email, password} = req.body;

  // attempt to login
  const user = login(email, password);
  if(user){
    res.send(`Hello ${user.firstName}`);
  }else{
    res.send("Invalid Login Attempt");
  }
});

app.post('/contact/submit', (req, res) => {

    // import the helper functions that we need
    const {isValidContactFormSubmit, sendEmailNotification} = require("./modules/contact-helpers");
  
    // Destructure the req.body object into variables
    const {firstName, lastName, email, comments} = req.body;
  
    // Validate the variables
    if(isValidContactFormSubmit(firstName, lastName, email, comments)){
      // Everything is valid, so send an email to YOUR email address with the data entered into the form
      const message = `From: ${firstName} ${lastName}\n
                      Email: ${email}\n
                      Message: ${comments}`;
  
      sendEmailNotification(message, (err, info) => {
        if(err){
          console.log(err);
          res.status(500).send("There was an error sending the email");
        }else{
            res.render("default-layout", {
                title: "Contact Confirmation",
                content: "<h2>Thank you for contacting me!</h2><p>I'll get back to you ASAP.</p>"
            })
        }
      })
  
    }else{
      res.status(400).send("Invalid request - data is not valid")
    }
  
});

app.get("/404", (req, res) => {
    res.status(404);
    res.render('default-layout', {
       title: "Page Not Found",
       content: "<h1>Sorry!</h1><h3>We can't find the page you're requesting.</h3>"
    });
});

app.all('*', (req, res) => {
    res.status(404).redirect("/404");
});

// START THE SERVER
const server = app.listen(port, () => {
   console.log("Waiting for requests on port %s", port);
});
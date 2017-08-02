// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
   res.json({todos: todos});
});
var id = 3;
app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
   var newTask = req.body.task;
   var newDescription = req.body.description;
   var newTodo = {
      "_id": req.body._id, 
      "task": newTask, 
      "description": newDescription
   };
   newTodo._id = id++;
   res.json(newTodo);
  
});

app.get('/api/todos/:id', function show(req, res) {
  var idBeingRequested = parseInt(req.params.id);
  var todoBeingRequested = todos.filter(function(todo) {
    return todo._id == idBeingRequested;
  })[0];
 
  res.json(todoBeingRequested);

  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
});

app.put('/api/todos/:id', function update(req, res) {

  var todoBeingUpdated;
  var idToChange = parseInt(req.params.id);
  // var result = todos.find(findTodos);
  for (var i = 0; i < todos.length; i++) {
    if (idToChange === todos[i]._id) {
      todoBeingUpdated = todos[i];
      todoBeingUpdated._id = idToChange;
      todoBeingUpdated.task = req.body.task;
      todoBeingUpdated.description = req.body.description;
      todos.splice(i, 1, todoBeingUpdated);
    }
  }

  res.json(todoBeingUpdated);

  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
});

app.delete('/api/todos/:id', function destroy(req, res) {

  var todoToBeDeleted;
  for (var i = 0; i < todos.length; i++) {
    if (req.params.id == todos[i]._id) {
      todoToBeDeleted = todos[i];
      todos.splice(i, 1);
    }
  }
  // var requestedId = req.params.id;
  // //var idToRequest = requestedId - 1;
  // var result;
  // for (var i = 0; i < todos.length; i++) {

  // }

  res.json(todoToBeDeleted);
  
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});

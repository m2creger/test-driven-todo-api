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

function findTodos(id) {
  return todos._id = id;
}


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

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
   var newTask = req.body.task;
   var newDescription = req.body.description;
   var newTodo = {"_id": todos.length+=1, "task": newTask, "description": newDescription};
   res.send(newTodo);
  
});

app.get('/api/todos/:id', function show(req, res) {
  var requestedId = req.params.id;
  //var requestedId = req.params.id - 1;
  // var result;
  var idToRequest = requestedId - 1;
  // for (var i = 0; i < todos.length; i++) {
  //   if (todos[i]._id === requestedId) {
  //     result = todos[i];
  //   }
  // };
  // console.log(req.body);
 
  // console.log("The result from filter is " + result);
  // var result = todos.find({_id: requestedId}, function(error, todo) {
  //   if (error) res.json({message: 'Could not update quote: '+ requestedId});
  // });

  var result = todos.find(requestedId);
  //var result = todos[requestedId];
  res.send(result);

  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
});

app.put('/api/todos/:id', function update(req, res) {

  var requestedId = req.params.id;
  var idToRequest = requestedId - 1;
  var newTask = req.body.task;
  var newDescription = req.body.description;
  var updatedToDo = todos[idToRequest];
  console.log(updatedToDo);
  updatedToDo.task = newTask;
  updatedToDo.description = newDescription;
  console.log(updatedToDo);

  res.send(updatedToDo);

  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
});

app.delete('/api/todos/:id', function destroy(req, res) {
  // var requestedId = req.params.id;
  // //var idToRequest = requestedId - 1;
  // var result;
  // for (var i = 0; i < todos.length; i++) {
  //   if (todos[i]._id == requestedId) {
  //     todos.splice(todos[i], 1);
  //   }
  // }

  // res.send(todos);
  
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});

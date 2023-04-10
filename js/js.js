function validateLogin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  if (username === "admin" && password === "admin") {
    alert("Login successful!");
    return true ; 
 } else {
    alert("Invalid username or password!");
    return false
  }
}

function validateForm() {
  var name = document.forms["myForm"]["name"].value;
  var email = document.forms["myForm"]["email"].value;
  var password = document.forms["myForm"]["password"].value;
  var confirmPassword = document.forms["myForm"]["confirmPassword"].value;

  if (name == "" || email == "" || password == "" || confirmPassword == "") {
    alert("Please fill out all fields");
    return false; // this is temp action
  }

  if (password != confirmPassword) {
    alert("Passwords do not match");
    return false; // this is temp action
  }

  alert("Registration successful!");
  return false; // this is temp action
}

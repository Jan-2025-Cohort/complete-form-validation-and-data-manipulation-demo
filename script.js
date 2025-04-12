//Form Elements
const form = document.getElementById("demoForm");
const nameInput = document.getElementById("fullName");
const nameError = document.getElementById("fullNameError");
const subGroup = document.getElementById("subscriptionGroup");
const subError = document.getElementById("subscriptionError");
const passInput = document.getElementById("password");
const passError = document.getElementById("passwordError");
const output = document.getElementById("output");

// Array to store all the form submissions
const submissions = [];

// 2. create the function
function formValidation(e) {
  e.preventDefault(); //stops the form from refreshing and submitting

  // 1) clear previous errors
  nameInput.style.border = "";
  nameError.textContent = "";
  subGroup.style.border = "";
  subError.textContent = "";
  passInput.style.border = "";
  passError.textContent = "";

  let valid = true;

  // 2) Name check: at least 2 chars
  if (nameInput.value.trim().length < 2) {
    valid = false;
    nameInput.style.border = "2px solid red";
    nameError.textContent = "Name must be at least 2 characters.";
  }

  // 3) Subscription check: one radio must be checked
  const chosen = document.querySelector('input[name="subscription"]:checked');
  if (!chosen) {
    valid = false;
    subGroup.style.border = "2px solid red";
    subError.textContent = "Please choose Free or Premium.";
  }

  // 4) Password check: at least 6 chars
  if (passInput.value.length < 6) {
    valid = false;
    passInput.style.border = "2px solid red";
    passError.textContent = "Password must be at least 6 characters.";
  }

  // Create a form data object with the data from the form inputs
  //if the form is valid, then console log the data object
  const formData = new FormData(form);
  const inputData = Object.fromEntries(formData);

  if (form.checkValidity()) {
    //Adds the data to the array
    submissions.push(inputData);

    // Display the form data
    displaySubmissions();

    // Clear form after submission
    form.reset();
  }
}

// Function that displays submission objects to the page
function displaySubmissions() {
    output.innerHTML = ""; // Clears previous entries

    submissions.forEach((obj, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p><strong>Submission #${index + 1}</strong></p>
            <p>Name: ${obj.Name}</p>
            <p>Subscription: ${obj.subscription}</p>
            <p>Password: ${obj.password}</p>
            <hr>
        `;
        output.appendChild(div);
    });
};

// 3. add the event listener to the form
form.addEventListener("submit", formValidation);

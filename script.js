// Function to save user data in local storage
function saveUserData(name, email, phone) {
  const userData = {
    name: name,
    email: email,
    phone: phone,
  };

  let userDataList = JSON.parse(localStorage.getItem("userDataList")) || [];
  userDataList.push(userData);
  localStorage.setItem("userDataList", JSON.stringify(userDataList));
}

// Function to display all user data in the HTML body
function displayAllUserData() {
  const userDataList = JSON.parse(localStorage.getItem("userDataList"));
  const bookingData = document.getElementById("bookingData");
  bookingData.innerHTML = ""; // Clear the previous data

  if (userDataList && userDataList.length > 0) {
    userDataList.forEach((userData, index) => {
      const userEntry = document.createElement("div");
      userEntry.classList.add("user-entry");
      userEntry.innerHTML = `
        <p><strong>Name:</strong> ${userData.name}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Phone Number:</strong> ${userData.phone}</p>
        <button class="edit-button" data-index="${index}">Edit</button>
        <button class="delete-button" data-index="${index}">Delete</button>
      `;
      bookingData.appendChild(userEntry);
    });
  }
}

// Event listener for form submission
const bookingForm = document.getElementById("bookingForm");
bookingForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");

  const name = nameInput.value;
  const email = emailInput.value;
  const phone = phoneInput.value;

  // Save user data in local storage
  saveUserData(name, email, phone);

  // Display all user data in the HTML body
  checkUI();

  // Clear form inputs
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
});
//Event listener for delete button
function setupDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const indexToDelete = e.target.getAttribute("data-index");
      deleteUserByIndex(indexToDelete);
    });
  });
}
//function to delete a user by index
function deleteUserByIndex(index) {
  let userDataList = JSON.parse(localStorage.getItem("userDataList")) || [];
  if (index >= 0 && index < userDataList.length) {
    userDataList.splice(index, 1);
    localStorage.setItem("userDataList", JSON.stringify(userDataList));
    checkUI(); //to refresh the UI after removing
  }
}
function checkUI() {
  displayAllUserData();
  setupDeleteButtons();
  setupEditButtons();
}
//Event listener for Edit Button
function setupEditButtons() {
  const editButtons = document.querySelectorAll(".edit-button");
  editButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const indexToEdit = e.target.getAttribute("data-index");
      populateUserDetailsForEdit(indexToEdit);
      deleteUserByIndex(indexToEdit);
    });
  });
}
//populate user details to input boxes
function populateUserDetailsForEdit(index) {
  const userDataList = JSON.parse(localStorage.getItem("userDataList"));
  if (index >= 0 && index < userDataList.length) {
    const user = userDataList[index];
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;
  }
}
// Initial functions when the page loads
checkUI();

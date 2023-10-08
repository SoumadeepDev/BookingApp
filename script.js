// Function to save user data in local storage
function saveUserData(name, email, phone) {
  let userDataList = JSON.parse(localStorage.getItem("userDataList")) || [];

  const userData = {
    name: name,
    email: email,
    phone: phone,
  };

  userDataList.push(userData);
  localStorage.setItem("userDataList", JSON.stringify(userDataList));
}

// Function to display all user data in the HTML body
function displayAllUserData() {
  const userDataList = JSON.parse(localStorage.getItem("userDataList"));

  if (userDataList && userDataList.length > 0) {
    const bookingData = document.getElementById("bookingData");
    bookingData.innerHTML = `
            <h2>Booking Details:</h2>
        `;

    userDataList.forEach((userData, index) => {
      const userEntry = document.createElement("div");
      userEntry.classList.add("user-entry");
      userEntry.innerHTML = `
                <p><strong>Name:</strong> ${userData.name}</p>
                <p><strong>Email:</strong> ${userData.email}</p>
                <p><strong>Phone Number:</strong> ${userData.phone}</p>
                <button class="delete-button" data-index="${index}">Delete</button>
            `;

      bookingData.appendChild(userEntry);
    });

    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        const indexToDelete = e.target.getAttribute("data-index");
        deleteUserByIndex(indexToDelete);
      });
    });
  }
}

// Function to delete a user by index
function deleteUserByIndex(index) {
  let userDataList = JSON.parse(localStorage.getItem("userDataList")) || [];

  if (index >= 0 && index < userDataList.length) {
    userDataList.splice(index, 1);
    localStorage.setItem("userDataList", JSON.stringify(userDataList));
    // Call checkUI to refresh the UI after removing a user
    checkUI();
  }
}

// Function to check the UI against local storage data and update the UI
function checkUI() {
  const userDataList = JSON.parse(localStorage.getItem("userDataList"));
  const userEntries = document.querySelectorAll(".user-entry");

  // Remove any user entries from the UI that do not exist in local storage
  userEntries.forEach((userEntry, index) => {
    if (!userDataList || index >= userDataList.length) {
      userEntry.remove();
    }
  });
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
  displayAllUserData();

  // Clear form inputs
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
});

// Initial display of all user data when the page loads
displayAllUserData();

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
      bookingData.innerHTML += `
                <div class="user-entry">
                    <p><strong>Name:</strong> ${userData.name}</p>
                    <p><strong>Email:</strong> ${userData.email}</p>
                    <p><strong>Phone Number:</strong> ${userData.phone}</p>
                </div>
            `;
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
  displayAllUserData();

  // Clear form inputs
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
});

// Initial display of all user data when the page loads
displayAllUserData();

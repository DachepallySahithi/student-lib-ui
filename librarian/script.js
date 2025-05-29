// --- Librarian Login ---
function librarianLogin(event) {
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const requestData = {
        email: email,
        password: password,
      };
      fetch("http://localhost:7777/librarian/apis/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.text())
        .then((data) => {
          if (data === "Librarian Can Login") {
            window.location.href = "dashboard.html";
          } else if (data === "Please enter correct Password") {
            alert("Please enter correct Password");
          } else if (data === "Librarian Does not exists") {
            alert("Your Account Does not Exists");
          }
        })
        .catch((error) => {
          console.error("Error during login:", error);
        });
    });
}

// --- Librarian Create Account ---
function createAccount() {
  document
    .getElementById("librarianForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(this);
      const librarianData = {};
      formData.forEach((value, key) => {
        librarianData[key] = value;
      });
      sendToApi(librarianData);
    });
}

// Function to send librarian create account data to API
function sendToApi(librarianData) {
  fetch("http://localhost:7777/librarian/apis/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(librarianData),
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        alert("Librarian created successfully!");
        document.getElementById("librarianForm").reset();
      } else {
        alert("Librarian Already exists");
      }
      //document.getElementById("librarianForm").reset();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while creating librarian.");
    });
}

// --- Librarian Login ---
function librarianLogin() {
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
}

// --- Librarian Create Account ---
function createAccount() {
  const email = document.getElementById("clemail").value;
  const password = document.getElementById("clpassword").value;
  const name = document.getElementById("clname").value;
  const gender = document.querySelector('input[name="clgender"]:checked').value;
  const country = document.getElementById("clcountry").value;
  const librarianData = {
    name: name,
    email: email,
    country: country,
    gender: gender,
    password: password,
  };
  fetch("http://localhost:7777/librarian/apis/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(librarianData),
  })
    .then((response) => {
      if (response.ok) {
        alert("Librarian created successfully!");
      } else {
        alert("Librarian Already exists");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while creating librarian.");
    });
}

function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  window.location.href = "student-dashboard.html";
}

// --- Book Form Buttons ---
document.getElementById("addBookBtn").onclick = function () {
  document.getElementById("addBookForm").style.display = "flex";
  document.getElementById("updateBookForm").style.display = "none";
  document.getElementById("deleteBookForm").style.display = "none";
};

document.getElementById("updateBookBtn").onclick = function () {
  document.getElementById("updateBookForm").style.display = "flex";
  document.getElementById("addBookForm").style.display = "none";
  document.getElementById("deleteBookForm").style.display = "none";
};

document.getElementById("deleteBookBtn").onclick = function () {
  document.getElementById("deleteBookForm").style.display = "flex";
  document.getElementById("addBookForm").style.display = "none";
  document.getElementById("updateBookForm").style.display = "none";
};

// --- Librarian Login ---
function librarianLogin(event) {
  event.preventDefault();
  window.location.href = "librarian-dashboard.html";
}

function createStudent() {
  console.log("Create Student")
    document.getElementById("student-account-creation").style.display = "flex";
  }

  function closeModal() {
    document.getElementById("student-account-creation").style.display = "none";
  }

  window.onclick = function(event) {
    const modal = document.getElementById("student-account-creation");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  function toggleFields() {
    console.log("Changed")
    // Get checkbox values
    const idChecked = document.getElementById("idcb").checked;
    const deptChecked = document.getElementById("deptcb").checked;
    const semChecked = document.getElementById("semcb").checked;

    // Show/hide text or dropdowns
    document.getElementById("idTextbox").style.display = idChecked ? "block" : "none";
    document.getElementById("deptDropdown").style.display = deptChecked ? "block" : "none";
    document.getElementById("semDropdown").style.display = semChecked ? "block" : "none";
  }
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

  function renderCards() {
    const idText = document.getElementById("idTextboxtb").textContent;
    const deptText = document.getElementById("departmentdd").textContent;
    const semText = document.getElementById("semdd").textContent;
    const selectedFilter = document.querySelector(
      'input[name="get-by-filter"]:checked'
    );

    if (!selectedFilter) {
      alert("Please select a filter: ID, Department, or Semester.");
      return;
    }

    // Optional: fetch input values here
    const filterValue = selectedFilter.value;

    let value;
    if (filterValue === "id") {
      value = document.getElementById("idTextboxtb").value;
      if (!value) return alert("Please enter a valid ID.");
    } else if (filterValue === "dept") {
      value = document.getElementById("departmentdd").value;
      if (!value) return alert("Please select a department.");
    } else if (filterValue === "sem") {
      value = document.getElementById("semdd").value;
      if (!value) return alert("Please select a semester.");
    }
    
    const students = [
      {
        id: 1,
        name: "Keerthana",
        dob: "01/04/2002",
        gender: "female",
        email: "keerthana123@gmaili.com",
        department: "IT",
        sem: "5th sem",
        card: {
          id: 3,
          cardStatus: "ACTIVE",
          createDate: "2025-05-16T16:37:59.256+00:00",
          updateDate: "2025-05-16T16:50:49.716+00:00",
          booksIssuedToCard: [
            {
              id: 1,
              name: "Wiki on C++",
              pages: 234,
              publisherName: "Nikhil",
              genre: "IT",
              available: false,
              transactionList: [],
            },
          ],
          transactionsForCard: [],
        },
      },
    ];//get info by calling api. this is just mock data
    const container = document.getElementById("cards-container");
    container.innerHTML = "";
    students.forEach((student) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="card-header">
          <h2>${student.name}</h2>
          <div class="meta">ID: ${student.id} • Dept: ${
        student.department
      }</div>
        </div>
        <div class="card-body">
          <ul class="info-list info-group">
            <li><span class="label">DOB:</span> ${student.dob}</li>
            <li><span class="label">Gender:</span> ${student.gender}</li>
            <li><span class="label">Email:</span> ${student.email}</li>
            <li><span class="label">Semester:</span> ${student.sem}</li>
          </ul>
          <div class="info-group">
            <h3>Library Card</h3>
            <ul class="info-list">
              <li><span class="label">Card ID:</span> ${student.card.id}</li>
              <li><span class="label">Status:</span> <span class="status-${student.card.cardStatus.toLowerCase()}">${
        student.card.cardStatus
      }</span></li>
              <li><span class="label">Created:</span> ${new Date(
                student.card.createDate
              ).toLocaleDateString()}</li>
              <li><span class="label">Updated:</span> ${new Date(
                student.card.updateDate
              ).toLocaleDateString()}</li>
            </ul>
          </div>
          <div class="info-group">
            <h3>Books Issued</h3>
            <table class="books-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Pages</th>
                  <th>Publisher</th>
                  <th>Genre</th>
                  <th>Available</th>
                </tr>
              </thead>
              <tbody>
                ${student.card.booksIssuedToCard
                  .map(
                    (book) => `
                  <tr>
                    <td>${book.name}</td>
                    <td>${book.pages}</td>
                    <td>${book.publisherName}</td>
                    <td>${book.genre}</td>
                    <td>${book.available ? "Yes" : "No"}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }
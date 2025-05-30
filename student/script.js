document.getElementById("addStdModBtn").onclick = function () {
  document.getElementById("student-account-creation").style.display = "flex";
  document.getElementById("filterSection").style.display = "none";
  document.getElementById("student-account-updation").style.display = "none";
  document.getElementById("delsid").style.display = "none";
};

document.getElementById("showStdBtn").onclick = function () {
  const btnDisplayProp = document.getElementById("filterSection").style.display;
  if (btnDisplayProp === "flex")
    document.getElementById("filterSection").style.display = "none";
  else document.getElementById("filterSection").style.display = "flex";
  document.getElementById("student-account-creation").style.display = "none";
  document.getElementById("student-account-updation").style.display = "none";
  document.getElementById("delsid").style.display = "none";
};

document.getElementById("cancelAdd").onclick = function () {
  document.getElementById("student-account-creation").style.display = "none";
};

document.getElementById("updStdModBtn").onclick = function () {
  document.getElementById("student-account-creation").style.display = "none";
  document.getElementById("filterSection").style.display = "none";
  document.getElementById("student-account-updation").style.display = "flex";
  document.getElementById("delsid").style.display = "none";
};

document.getElementById("cancelUpd").onclick = function () {
  document.getElementById("student-account-updation").style.display = "none";
};

document.getElementById("delStudbtn").onclick = function () {
  document.getElementById("student-account-creation").style.display = "none";
  document.getElementById("filterSection").style.display = "none";
  document.getElementById("student-account-updation").style.display = "none";
  const btnDisplayProp = document.getElementById("delsid").style.display;
  if (btnDisplayProp === "flex")
    document.getElementById("delsid").style.display = "none";
  else document.getElementById("delsid").style.display = "flex";
};

document.getElementById("csdob").max = new Date().toISOString().split("T")[0];
document.getElementById("usdob").max = new Date().toISOString().split("T")[0];

// --- Student Login ---
function loginStudent() {
  const email = document.getElementById("studentemail").value;
  const password = document.getElementById("studentpassword").value;
  const requestData = {
    email: email,
    password: password,
  };
  fetch("http://localhost:7777/student/apis/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.text())
    .then((data) => {
      if (data === "Student Can Login") {
        window.location.href = "student-dashboard.html?studentId=" + password;
      } else if (data === "Please enter correct Password") {
        alert("Please enter correct Password");
      } else if (data === "Student Does not exists") {
        alert("Your Account Does not Exists");
      }
    })
    .catch((error) => {
      console.error("Error during login:", error);
    });
}

// fetch student details when page loads
window.onload = function () {
  //window.location.pathname.contains("student-dashboard.html?studentId=")
  if (window.location.pathname.endsWith("student-dashboard.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get("studentId");
    fetch(`http://localhost:7777/student/apis/find/${studentId}`)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("studentName").innerText = data[0].name;
        document.getElementById("studentId").innerText = data[0].id;
        document.getElementById("studentDept").innerText = data[0].department;
        document.getElementById("studentSem").innerText = data[0].sem;
        document.getElementById("studentEmail").innerText = data[0].email;
        document.getElementById("studentGender").innerText = data[0].gender;
        document.getElementById("studentDob").innerText = data[0].dob;
        document.getElementById("studentCardId").innerText = data[0].card?.id;
      })
      .catch((error) => {
        console.error("Error fetching student:", error);
      });
  }
};

function printCard() {
  const urlParams = new URLSearchParams(window.location.search);
  const studentId = urlParams.get("studentId");
  const url = `http://localhost:7777/card/apis/print?studentId=${studentId}`;

  fetch(url, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        const filename =
          response.headers.get("Content-Disposition")?.split("filename=")[1] ||
          "LibraryCard.pdf"; //getting file name from response headers

        return response.blob().then((blob) => {
          //Converts the response body (the PDF byte stream) into a Blob object. blob() is an asynchronous operation, so we chain another .then() to handle it once the blob is ready.
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob); //Generates a temporary URL representing the PDF blob in memory. Assigns this URL to the href attribute of the anchor tag.
          link.download = filename; //Sets the download attribute of the anchor tag, specifying the filename for the downloaded PDF.
          document.body.appendChild(link); //Appends the anchor tag to the DOM temporarily so it can be triggered.
          link.click(); //Simulates a user click on the anchor tag to start the download.
          document.body.removeChild(link); //Removes the anchor tag from the DOM after the download is triggered, cleaning up.

          const message = response.headers.get("X-Message");
          if (message) alert(message);
        });
      } else {
        const message = response.headers.get("X-Message");
        if (message) {
          alert(message);
        } else {
          alert("Something went wrong!");
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching the library card:", error);
      alert("Failed to download Library Card.");
    });
}

function createStudent() {
  const name = document.getElementById("csname").value;
  const email = document.getElementById("csemail").value;
  const gender = document.querySelector('input[name="csgender"]:checked').value;
  const dob = document.getElementById("csdob").value;
  const dept = document.getElementById("csdepartment").value;
  const sem = document.getElementById("cssem").value;
  const requestData = {
    name: name,
    dob: dob,
    gender: gender,
    email: email,
    department: dept,
    sem: sem,
  };
  fetch("http://localhost:7777/student/apis/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.text())
    .then((data) => {
      if (data === "Student Saved Successfully") alert(data);
    })
    .catch((error) => {
      alert(error);
    });
}

function updateStudent() {
  const id = document.getElementById("usid").value;
  const name = document.getElementById("usname").value;
  const email = document.getElementById("usemail").value;
  const gender = document.querySelector('input[name="usgender"]:checked').value;
  const dob = document.getElementById("usdob").value;
  const dept = document.getElementById("usdepartment").value;
  const sem = document.getElementById("ussem").value;
  const requestData = {
    name: name,
    dob: dob,
    gender: gender,
    email: email,
    department: dept,
    sem: sem,
  };
  fetch(`http://localhost:7777/student/apis/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.text())
    .then((data) => {
      if (data === "Student Updated Successfully") alert(data);
    })
    .catch((error) => {
      alert(error);
    });
}

function deleteStudent() {
  const id = document.getElementById("delsidtb").value;
  fetch(`http://localhost:7777/student/apis/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.text())
    .then((data) => {
      if (data === "Student Deleted Successfully") alert(data);
    })
    .catch((error) => {
      alert(error);
    });
}

function toggleFields() {
  const idChecked = document.getElementById("idcb").checked;
  const deptChecked = document.getElementById("deptcb").checked;
  const semChecked = document.getElementById("semcb").checked;

  // Show/hide text or dropdowns
  document.getElementById("idTextbox").style.display = idChecked
    ? "block"
    : "none";
  document.getElementById("deptDropdown").style.display = deptChecked
    ? "block"
    : "none";
  document.getElementById("semDropdown").style.display = semChecked
    ? "block"
    : "none";
}

function renderCards() {
  const selectedFilter = document.querySelector(
    'input[name="get-by-filter"]:checked'
  );

  if (!selectedFilter) {
    alert("Please select a filter: ID, Department, or Semester.");
    return;
  }

  const filterValue = selectedFilter.value;
  let value;
  let url;
  if (filterValue === "id") {
    value = document.getElementById("idTextboxtb").value;
    if (!value) return alert("Please enter a valid ID.");
    else url = `http://localhost:7777/student/apis/find/${value}`;
  } else if (filterValue === "dept") {
    value = document.getElementById("departmentdd").value;
    if (!value) return alert("Please select a department.");
    else
      url = `http://localhost:7777/student/apis/findByDept?department=${value}`;
  } else if (filterValue === "sem") {
    value = document.getElementById("semdd").value;
    if (!value) return alert("Please select a semester.");
    else url = `http://localhost:7777/student/apis/findBySem?sem=${value}`;
  }
  console.log(value);

  let students = []; //get info by calling api. this is just mock data
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      students = data;
      console.log(students);
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
              <li><span class="label">Card ID:</span> ${student.card?.id}</li>
              <li><span class="label">Status:</span> <span class="status-${
                student.card?.cardStatus
              }">${student.card?.cardStatus}</span></li>
              <li><span class="label">Created:</span> ${new Date(
                student.card?.createDate
              ).toLocaleDateString()}</li>
              <li><span class="label">Updated:</span> ${new Date(
                student.card?.updateDate
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
                ${student.card?.booksIssuedToCard
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
    })
    .catch((error) => {
      console.error("Error While Fetching Details:", error);
    });
}

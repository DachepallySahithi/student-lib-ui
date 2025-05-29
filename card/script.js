function addCard() {
  const studentId = document.getElementById("addstudentid").value;
  const cardStatus = document.getElementById("addcardstatus").value;
  const requestData = {
    cardStatus: cardStatus,
    studentId: studentId,
  };
  fetch("http://localhost:7777/card/apis/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.text())
    .then((data) => {
      if (data.includes("Card Already Alloted")) {
        alert(data);
      } else if (data.includes("Card Alloted to")) {
        alert(data);
      } else if (data === "Student Does not exist") {
        alert("Student Does not exist");
      }
    })
    .catch((error) => {
      alert("Error while creating Card");
    });
}

function updateCard() {
  const cardId = document.getElementById("updatecardid").value;
  const studentId = document.getElementById("updatestudentid").value;
  const cardStatus = document.getElementById("updatecardstatus").value;
  const requestData = {
    cardStatus: cardStatus,
    studentId: studentId,
  };
  fetch(`http://localhost:7777/card/apis/update/${cardId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.text())
    .then((data) => {
      if (data.includes("Card does not belong to the Student")) {
        alert(data);
      } else if (data.includes("Card updated successfully")) {
        alert(data);
      } else if (data === "Card not found") {
        alert(data);
      }
    })
    .catch((error) => {
      alert("Error while updating Card");
    });
}

function deleteCard() {
  const cardId = document.getElementById("delcardid").value;
  fetch(`http://localhost:7777/card/apis/delete/${cardId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.text())
    .then((data) => {
      if (data === "Card deleted successfully") {
        alert(data);
      } else if (data === "Card not found") {
        alert(data);
      }
    })
    .catch((error) => {
      alert("Error while deleting Card");
    });
}

function printCard() {
  const studentId = document.getElementById("printstudid").value;
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
          //Binary Large Object
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

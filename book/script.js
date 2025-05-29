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

function addBook() {
  const bookName = document.getElementById("bookname").value;
  const pages = document.getElementById("pages").value;
  const publisher = document.getElementById("publisher").value;
  const genre = document.getElementById("genre").value;
  const available = document.getElementById("availablecb").checked;
  const authorId = document.getElementById("author").value;
  const cardId = document.getElementById("card").value;
  console.log("Card ID: ", cardId);
  const requestData = {
    name: bookName,
    pages: pages,
    publisherName: publisher,
    genre: genre,
    available: available,
    authorId: authorId,
    cardId: cardId,
  };
  fetch("http://localhost:7777/book/apis/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.text())
    .then((data) => {
      if (data === "Book Saved into database") {
        alert("Book Added");
      } else if (data.includes("So we cannot Allocate this Book")) {
        alert("We cannot Allocate this Book");
      } else if (data === "Card Does not exists") {
        alert("Card Does not exists");
      } else if (data === "Author Does not exists") {
        alert("Author Does not exists");
      }
    })
    .catch((error) => {
      console.log(error);
      alert("Error while adding Book");
    });
}
function updateBook() {
  const bookId = document.getElementById("updatebookId").value;
  const bookName = document.getElementById("updatebookname").value;
  const pages = document.getElementById("updatepages").value;
  const publisher = document.getElementById("updatepublisher").value;
  const genre = document.getElementById("updategenre").value;
  const available = document.getElementById("updateavailablecb").checked;
  const authorId = document.getElementById("updateauthor").value;
  const cardId = document.getElementById("updatecard").value;
  const requestData = {
    name: bookName,
    pages: pages,
    publisherName: publisher,
    genre: genre,
    available: available,
    authorId: authorId,
    cardId: cardId,
  };
  fetch(`http://localhost:7777/book/apis/update/${bookId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.text())
    .then((data) => {
      if (data === "Book not found") {
        alert("Book not found");
      } else {
        alert(data);
      }
    })
    .catch((error) => {
      alert("Error while updating Book", error);
    });
}
function deleteBook() {
  const bookId = document.getElementById("bookid").value;
  fetch(`http://localhost:7777/book/apis/delete/${bookId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.text())
    .then((data) => {
      if (data === "Book deleted") {
        alert("Book deleted");
      } else if (data === "Book Does not exists") {
        alert("Book Does not exists");
      }
    })
    .catch((error) => {
      alert("Error while deleting Book");
    });
}

document.getElementById("atduedate").max = new Date()
  .toISOString()
  .split("T")[0];

function addTransaction() {
  const cardId = document.getElementById("atcardid").value;
  const bookId = document.getElementById("atbookid").value;
  const dueDate = document.getElementById("atduedate").value;
  const transactionType = document.getElementById("transaction_type").value;
  const penalty = document.getElementById("atpenalty").value;
  const transactionStatus = document.getElementById("transaction_status").value;
  const requestData = {
    cardId: cardId,
    bookId: bookId,
    dueDate: dueDate,
    issueOrReturn: transactionType,
    fine: penalty,
    transactionStatus: transactionStatus,
  };
  fetch("http://localhost:7777/transaction/apis/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.text())
    .then((data) => {
      if (data === "Transaction added successfully") alert(data);
      else alert(data);
    })
    .catch((error) => {
      alert(error);
    });
}

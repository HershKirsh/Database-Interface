const htmlElems = {
  getUserTz: document.getElementById("getUserTz"),
  theForm: document.getElementById("adduserform"),
  formFirstName: document.getElementById("first"),
  formCaption: document.getElementById("form-caption"),
  formLastName: document.getElementById("last"),
  formEmail: document.getElementById("email"),
  formPassword: document.getElementById("password"),
  formTz: document.getElementById("tz"),
  formDob: document.getElementById("dob"),
  formSubmit: document.getElementById("addusersubmit"),
  clearForm: document.getElementById("clearform"),
  getAllButton: document.getElementById("getall"),
  userTable: document.getElementById("usertable")
};
function getAllUsers() {
  var url = "./server/api/selectAll.php";
  fetch(url, { method: 'get' })
    .then(res => {
      return res.json();
    })
    .then(data => {
      sendToConsole(data);
      appendHtml(data);
    })
};
function appendHtml(users) {
  htmlElems.getAllButton.classList.add("button-clicked");
  var append = `<thead><th>User Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Teudat Zeut</th>
            <th>Date of Birth</th>
            <th>Remove User</th></thead>`;
  users.forEach(user => {
    append += `<tr><td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.teudatZeut}</td>
            <td>${checkDob(user.DOB)}</td>
            <td><button onclick="deleteUser(this, ${user.id})">X</button></td></tr>`
  });
  append += `<tfoot><tr><td colspan="7">Total number of users is ${users.length}</td></tr></tfoot>`
  setTimeout(() => {
    htmlElems.userTable.innerHTML = append;
  }, 550);
};
function checkDob(dob) {
  if (dob == null) {
    return "";
  } else {
    return dob
  }
};
function getSingleUser() {
  if (htmlElems.getUserTz.value != "") {
    var url = "./server/api/selectOne.php?tz=" + htmlElems.getUserTz.value;
    fetch(url, { method: 'GET' })
      .then(res => {
        return res.json();
      })
      .then(data => {
        sendToConsole(data);
        placeInfo(data);
      })
  };
};
function placeInfo(user) {
  htmlElems.getUserTz.value = "";
  if (user.length == 0) {
    alert("No user found.");
  } else {
    htmlElems.formFirstName.value = user[0].firstName;
    htmlElems.formLastName.value = user[0].lastName;
    htmlElems.formEmail.value = user[0].email;
    htmlElems.formPassword.value = user[0].password;
    htmlElems.formTz.value = user[0].teudatZeut;
    htmlElems.formTz.readOnly = true;
    htmlElems.formTz.setAttribute("id", "tznoedit");
    htmlElems.formDob.value = user[0].DOB;
    htmlElems.formCaption.innerHTML = "Update This User";
    htmlElems.formSubmit.setAttribute("value", "Update User");
    // htmlElems.formSubmit.setAttribute("onclick", "updateUser()");
    htmlElems.clearForm.style.display = "inline-block";
    htmlElems.theForm.removeEventListener("submit", addUser);
    htmlElems.theForm.addEventListener("change", changeMade);
    htmlElems.formSubmit.className = "inactive";
  };
};
function sendToConsole(theData) {
  console.log(theData)
};
function resetForm() {
  htmlElems.getUserTz.value = "";
  htmlElems.formCaption.innerHTML = "Add a User";
  htmlElems.formTz.readOnly = false;
  htmlElems.formTz.setAttribute("id", "tz");
  htmlElems.formSubmit.setAttribute("value", "Add User");
  htmlElems.theForm.removeEventListener("submit", updateUser);
  htmlElems.theForm.addEventListener("submit", addUser);
  htmlElems.clearForm.style.display = "none";
};
htmlElems.theForm.addEventListener("submit", addUser);
function addUser(e) {
  e.preventDefault();
  var formData = new FormData(htmlElems.theForm);
  console.log(formData);
 //if (Object.entries(formData).length !== 0) {
    var url = "./server/api/addUser.php";
    fetch(url, { method: 'POST', body: formData })
      .then(res => {
        return res.json();
      })
      .then(data => {
        checkForSuccess(data);
      })
      htmlElems.clearForm.click();
 // };
};
function checkForSuccess(theData) {
  if (theData.message == "Success") {
    alert("Successfully Added!");
  };
};
function updateUser(e) {
  e.preventDefault();
    var formData = new FormData(htmlElems.theForm);
    var url = "./server/api/updateUser.php";
    fetch(url, { method: 'POST', body: formData })
      .then(res => {
        return res.json();
      })
      .then(data => {
        checkForSuccess(data);
      });
    htmlElems.clearForm.click();
};
function deleteUser(user, id) {
  let tr = user.parentElement.parentElement;
  var url = "./server/api/deleteUser.php?id=" + id;
  fetch(url, { method: 'GET' })
    .then(res => {
      return res.json();
    })
    .then(data => {
      checkForSuccess(data);
    });
  tr.remove();
};
function changeMade() {
  htmlElems.theForm.addEventListener("submit", updateUser);
  htmlElems.formSubmit.className = "button";
  console.log("Change Made")
};
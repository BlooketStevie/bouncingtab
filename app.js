// Firebase references assumed initialized in firebase.js
// Make sure firebase.js is loaded first!

// Display uploaded files
function loadUploads() {
  const listRef = storage.ref().child('uploads');
  const fileList = document.getElementById('fileList');
  fileList.innerHTML = "";

  listRef.listAll().then((res) => {
    res.items.forEach((itemRef) => {
      itemRef.getDownloadURL().then((url) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.textContent = itemRef.name;
        li.appendChild(link);
        fileList.appendChild(li);
      });
    });
  }).catch((err) => {
    console.error("Error listing files:", err);
  });
}

// Login function
function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      document.getElementById('user-info').textContent = `Logged in as ${user.email}`;
      document.getElementById('upload-section').classList.remove('hidden');
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
}

// Signup function
function signup() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      document.getElementById('user-info').textContent = `Signed up and logged in as ${user.email}`;
      document.getElementById('upload-section').classList.remove('hidden');
    })
    .catch((error) => {
      alert("Signup failed: " + error.message);
    });
}

// Upload file function
document.getElementById("upload-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const file = document.getElementById("fileInput").files[0];
  if (!file) return alert("Please select a file to upload.");

  const uploadRef = storage.ref(`uploads/${file.name}`);
  uploadRef.put(file)
    .then(() => {
      alert("Upload successful!");
      document.getElementById("fileInput").value = "";
      loadUploads();
    })
    .catch((error) => {
      alert("Upload error: " + error.message);
    });
});

// Load uploaded files on startup
window.onload = loadUploads;

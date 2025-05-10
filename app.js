const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const userWelcome = document.getElementById('userWelcome');

const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const authForms = document.getElementById('authForms');

const uploadSection = document.getElementById('uploadSection');
const uploadForm = document.getElementById('uploadForm');
const uploadStatus = document.getElementById('uploadStatus');

// Show login/signup forms
loginBtn.onclick = () => {
  authForms.classList.remove('hidden');
  loginForm.classList.remove('hidden');
  signupForm.classList.add('hidden');
};

signupBtn.onclick = () => {
  authForms.classList.remove('hidden');
  signupForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
};

// Handle login
loginForm.onsubmit = (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      userWelcome.textContent = `Welcome, ${user.email}`;
      authForms.classList.add('hidden');
      uploadSection.classList.remove('hidden');
    })
    .catch((error) => alert("Login error: " + error.message));
};

// Handle signup
signupForm.onsubmit = (e) => {
  e.preventDefault();
  const email = signupForm.email.value;
  const password = signupForm.password.value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      userWelcome.textContent = `Welcome, ${user.email}`;
      authForms.classList.add('hidden');
      uploadSection.classList.remove('hidden');
    })
    .catch((error) => alert("Signup error: " + error.message));
};

// Handle file upload
uploadForm.onsubmit = (e) => {
  e.preventDefault();
  const file = uploadForm.file.files[0];
  if (!file) return alert("No file selected");

  const user = auth.currentUser;
  const uploadRef = storage.ref().child(`homework/${user.uid}/${file.name}`);
  uploadRef.put(file)
    .then(() => {
      uploadStatus.textContent = `Uploaded: ${file.name}`;
      uploadForm.reset();
    })
    .catch((err) => {
      console.error("Upload error:", err);
      alert("Upload failed");
    });
};

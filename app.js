import { initialTeachers } from "./data.js";

let teachers = [...initialTeachers];
let currentUser = "";
let selectedTeacher = null;
let selectedClass = null;
let uploads = {};
let announcements = [
  "Welcome to Armorel Homework Share!",
  "New assignments due Friday!",
  "Admin office hours: 3-4 PM daily.",
];

// DOM Elements
const teacherList = document.getElementById("teacherList");
const classList = document.getElementById("classList");
const classDetail = document.getElementById("classDetail");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");
const closeLogin = document.getElementById("closeLogin");
const closeSignup = document.getElementById("closeSignup");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const adminDashboard = document.getElementById("adminDashboard");
const announcementList = document.getElementById("announcementList");
const announcementPopup = document.getElementById("announcementPopup");
const addAnnouncementBtn = document.getElementById("addAnnouncementBtn");

// Helpers
function clearMain() {
  teacherList.classList.add("hidden");
  classList.classList.add("hidden");
  classDetail.classList.add("hidden");
}

// Render Functions
function renderTeachers() {
  clearMain();
  teacherList.classList.remove("hidden");
  teacherList.innerHTML = "";
  teachers.forEach((t, i) => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded shadow cursor-pointer hover:shadow-xl";
    card.textContent = t.name;
    card.onclick = () => {
      selectedTeacher = t;
      renderClasses();
    };
    teacherList.appendChild(card);
  });
}

function renderClasses() {
  clearMain();
  classList.classList.remove("hidden");
  classList.innerHTML = "";

  selectedTeacher.classes.forEach((c, i) => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded shadow cursor-pointer hover:shadow-xl";
    card.innerHTML = `<h2 class="text-lg font-semibold text-blue-700">${c.name}</h2><p class="text-sm">Period: ${c.period}</p>`;
    card.onclick = () => {
      selectedClass = c;
      renderClassDetail();
    };
    classList.appendChild(card);
  });

  const backBtn = document.createElement("button");
  backBtn.textContent = "← Back to Teachers";
  backBtn.className = "col-span-full mt-4 bg-gray-100 px-3 py-2 rounded";
  backBtn.onclick = () => {
    selectedTeacher = null;
    renderTeachers();
  };
  classList.appendChild(backBtn);
}

function renderClassDetail() {
  clearMain();
  classDetail.classList.remove("hidden");
  classDetail.innerHTML = `
    <div class="bg-white p-6 rounded shadow mb-4">
      <h2 class="text-2xl font-bold text-blue-700">${selectedClass.name}</h2>
      <p class="text-gray-700">Period: ${selectedClass.period}</p>
      <p class="mt-2 text-purple-800">Homework: ${selectedClass.homework}</p>
    </div>
  `;

  if (currentUser) {
    const uploadForm = document.createElement("form");
    uploadForm.className = "space-y-2";
    uploadForm.innerHTML = `
      <label class="block text-left text-sm font-semibold">Upload Assignment:</label>
      <input type="file" name="upload" class="border p-2 rounded w-full" required />
      <button type="submit" class="bg-purple-600 text-white px-4 py-2 rounded">Submit</button>
    `;
    uploadForm.onsubmit = (e) => {
      e.preventDefault();
      const file = e.target.upload.files[0];
      if (!file) return;
      const key = `${selectedTeacher.name}-${selectedClass.name}`;
      uploads[key] = uploads[key] ? [...uploads[key], file.name] : [file.name];
      renderClassDetail();
    };
    classDetail.appendChild(uploadForm);
  }

  const submitted = uploads[`${selectedTeacher.name}-${selectedClass.name}`] || [];
  const submittedList = document.createElement("ul");
  submittedList.className = "list-disc list-inside mt-4 text-left text-sm";
  submittedList.innerHTML = submitted.map(f => `<li>${f}</li>`).join("");
  if (submitted.length) {
    classDetail.innerHTML += `<h4 class="font-semibold text-md text-gray-700 mt-6 mb-2 text-left">Submitted Assignments:</h4>`;
    classDetail.appendChild(submittedList);
  }

  const backBtn = document.createElement("button");
  backBtn.textContent = "← Back to Classes";
  backBtn.className = "mt-6 bg-gray-100 px-3 py-2 rounded";
  backBtn.onclick = () => {
    selectedClass = null;
    renderClasses();
  };
  classDetail.appendChild(backBtn);
}

function renderAnnouncements() {
  announcementPopup.innerHTML = announcements.map(a => `<li>${a}</li>`).join("");
  announcementList.innerHTML = announcements.map((a, i) => `
    <li class="flex justify-between bg-white px-3 py-1 rounded shadow">
      <span>${a}</span>
      <button class="text-red-500" onclick="removeAnnouncement(${i})">×</button>
    </li>
  `).join("");
}

window.removeAnnouncement = function (index) {
  announcements.splice(index, 1);
  renderAnnouncements();
};

// Auth Handlers
loginBtn.onclick = () => loginModal.classList.remove("hidden");
signupBtn.onclick = () => signupModal.classList.remove("hidden");
closeLogin.onclick = () => loginModal.classList.add("hidden");
closeSignup.onclick = () => signupModal.classList.add("hidden");

loginForm.onsubmit = (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  currentUser = username;
  alert("Logged in as " + username);
  loginModal.classList.add("hidden");
  if (username === "admin") adminDashboard.classList.remove("hidden");
};

signupForm.onsubmit = (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  currentUser = username;
  alert("Signed up as " + username);
  signupModal.classList.add("hidden");
};

addAnnouncementBtn.onclick = () => {
  const msg = prompt("New announcement:");
  if (msg) {
    announcements.push(msg);
    renderAnnouncements();
  }
};

// Initial render
renderTeachers();
renderAnnouncements();

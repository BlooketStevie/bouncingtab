import { initialTeachers } from './data.js';

let currentUser = "";
let teachers = [...initialTeachers];
let selectedTeacher = null;
let selectedClass = null;
let announcements = [
  "Welcome to Armorel Homework Share!",
  "New assignments due Friday!",
  "Admin office hours: 3-4 PM daily.",
];
let uploads = {};

window.addEventListener("DOMContentLoaded", () => {
  renderTeacherList();
  renderAnnouncements();
});

function renderTeacherList() {
  // Will render teacher cards into a container (you’ll add a <div id="teacherList"> in HTML)
}

function renderAnnouncements() {
  // Will render the announcements into the bottom popup
}

// More rendering + event functions will go here

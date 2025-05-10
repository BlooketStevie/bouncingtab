import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

// Firebase setup
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD-f-UF3nM-R1TSMegY7lW9szHoS7f3WJI",
  authDomain: "armorel-3e2bf.firebaseapp.com",
  projectId: "armorel-3e2bf",
  storageBucket: "armorel-3e2bf.firebasestorage.app",
  messagingSenderId: "899798221811",
  appId: "1:899798221811:web:f90cba6fb4e52f496f0886",
  measurementId: "G-PXTNXCTHRG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const initialTeachers = [
  {
    name: "Mr. Thompson",
    classes: [
      { name: "Algebra I", period: "1st", homework: "Finish worksheet pg 45" },
      { name: "Geometry", period: "3rd", homework: "Study for quiz" },
      { name: "Calculus", period: "5th", homework: "Derivatives practice" },
      { name: "Statistics", period: "7th", homework: "Project outline" },
    ],
  },
  {
    name: "Ms. Carter",
    classes: [
      { name: "English I", period: "2nd", homework: "Read Chapter 3" },
      { name: "Literature", period: "4th", homework: "Essay draft" },
      { name: "Writing", period: "6th", homework: "Grammar exercise" },
      { name: "Speech", period: "8th", homework: "Presentation prep" },
    ],
  },
  {
    name: "Mr. Li",
    classes: [
      { name: "Biology", period: "1st", homework: "Lab report" },
      { name: "Chemistry", period: "3rd", homework: "Mole conversions" },
      { name: "Physics", period: "5th", homework: "Force diagram" },
      { name: "Environmental Sci.", period: "7th", homework: "Field notes" },
    ],
  },
  {
    name: "Mrs. Evans",
    classes: [
      { name: "World History", period: "2nd", homework: "Map worksheet" },
      { name: "U.S. History", period: "4th", homework: "Timeline project" },
      { name: "Government", period: "6th", homework: "Bill analysis" },
      { name: "Economics", period: "8th", homework: "Budget planning" },
    ],
  },
];

export default function App() {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [announcements, setAnnouncements] = useState([
    "Welcome to Armorel Homework Share!",
    "New assignments due Friday!",
    "Admin office hours: 3-4 PM daily.",
  ]);
  const [uploads, setUploads] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    alert("Logged in as " + username);
    setCurrentUser(username);
    setShowLogin(false);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    alert("Signed up as " + username);
    setCurrentUser(username);
    setShowSignup(false);
  };

  const handleAddAnnouncement = () => {
    const msg = prompt("New announcement:");
    if (msg) setAnnouncements([...announcements, msg]);
  };

  const handleRemoveAnnouncement = (index) => {
    const newAnnouncements = announcements.filter((_, i) => i !== index);
    setAnnouncements(newAnnouncements);
  };

  const handleUpload = (e) => {
    const file = e.target.elements.upload.files[0];
    if (!file) return;
    const key = `${selectedTeacher.name}-${selectedClass.name}`;
    const newList = uploads[key] ? [...uploads[key], file.name] : [file.name];
    setUploads({ ...uploads, [key]: newList });
    e.target.reset();
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-purple-700">Armorel Homework Share</h1>
        <div className="space-x-4">
          <Dialog open={showLogin} onOpenChange={setShowLogin}>
            <DialogTrigger asChild>
              <Button variant="outline">Login</Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <h2 className="text-xl font-semibold">Login</h2>
                <Input name="username" type="text" placeholder="Username" required />
                <Input type="password" placeholder="Password" required />
                <Button type="submit">Login</Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={showSignup} onOpenChange={setShowSignup}>
            <DialogTrigger asChild>
              <Button variant="default">Sign Up</Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleSignup} className="space-y-4">
                <h2 className="text-xl font-semibold">Sign Up</h2>
                <Input name="username" type="text" placeholder="Username" required />
                <Input type="password" placeholder="Password" required />
                <Button type="submit">Create Account</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Admin Page */}
      {currentUser === "admin" && (
        <div className="mb-8 p-4 bg-yellow-100 border border-yellow-400 rounded shadow">
          <h2 className="text-xl font-bold text-yellow-800 mb-2">Admin Dashboard</h2>
          <Tabs defaultValue="announcements" className="w-full">
            <TabsList>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="teachers">Teachers & Classes</TabsTrigger>
            </TabsList>
            <TabsContent value="announcements">
              <div className="space-y-2">
                {announcements.map((a, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span>{a}</span>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveAnnouncement(i)}>Remove</Button>
                  </div>
                ))}
                <Button className="mt-2" onClick={handleAddAnnouncement}>+ Add Announcement</Button>
              </div>
            </TabsContent>
            <TabsContent value="teachers">
              <div className="grid gap-4">
                {teachers.map((t, i) => (
                  <div key={i} className="p-2 border rounded">
                    <div className="flex justify-between items-center">
                      <strong>{t.name}</strong>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const newName = prompt("Rename teacher:", t.name);
                          if (newName) {
                            const updated = [...teachers];
                            updated[i].name = newName;
                            setTeachers(updated);
                          }
                        }}
                      >Rename</Button>
                    </div>
                    <ul className="pl-4 mt-2 space-y-1">
                      {t.classes.map((c, j) => (
                        <li key={j} className="flex justify-between">
                          {c.name} ({c.period})
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newName = prompt("Rename class:", c.name);
                              if (newName) {
                                const updated = [...teachers];
                                updated[i].classes[j].name = newName;
                                setTeachers(updated);
                              }
                            }}
                          >Rename</Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {!selectedTeacher ? (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {teachers.map((teacher, i) => (
            <motion.div layout key={i}>
              <Card
                onClick={() => setSelectedTeacher(teacher)}
                className="cursor-pointer hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <h2 className="text-xl font-semibold text-purple-600">{teacher.name}</h2>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : !selectedClass ? (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {selectedTeacher.classes.map((cls, i) => (
            <motion.div layout key={i}>
              <Card
                onClick={() => setSelectedClass(cls)}
                className="cursor-pointer hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <h2 className="text-lg font-semibold text-blue-700">{cls.name}</h2>
                  <p className="text-sm text-gray-600">Period: {cls.period}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          <Button className="col-span-full mt-4" onClick={() => setSelectedTeacher(null)}>
            ← Back to Teachers
          </Button>
        </motion.div>
      ) : (
        <motion.div layout className="max-w-xl mx-auto text-center">
          <Card className="mb-4">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-blue-700">{selectedClass.name}</h2>
              <p className="text-gray-700">Period: {selectedClass.period}</p>
              <p className="mt-2 text-purple-800">Homework: {selectedClass.homework}</p>
            </CardContent>
          </Card>

          {currentUser && (
            <Dialog>
              <DialogTrigger asChild>
                <Button>Upload Assignment</Button>
              </DialogTrigger>
              <DialogContent>
                <h3 className="text-lg font-bold mb-2">Upload Your Work</h3>
                <form onSubmit={handleUpload} className="space-y-4">
                  <Input name="upload" type="file" required />
                  <Button type="submit">Submit</Button>
                </form>
              </DialogContent>
            </Dialog>
          )}

          {/* Uploaded Files */}
          <div className="mt-6 text-left">
            <h4 className="font-semibold text-md text-gray-700 mb-2">Submitted Assignments:</h4>
            <ul className="list-disc list-inside text-sm">
              {(uploads[`${selectedTeacher.name}-${selectedClass.name}`] || []).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          <Button variant="ghost" className="mt-6" onClick={() => setSelectedClass(null)}>
            ← Back to Classes
          </Button>
        </motion.div>
      )}

      {/* Announcements Section */}
      <div className="fixed bottom-4 left-4 w-64 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
        <h3 className="text-lg font-bold text-purple-700 mb-2">📢 Announcements</h3>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          {announcements.map((note, i) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import {
  BsPeopleFill,
  BsBookFill,
  BsGraphUpArrow,
  BsGenderFemale
} from "react-icons/bs";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend
} from "recharts";

Modal.setAppElement("#root");

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [gpaTrend, setGpaTrend] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    surname: "",
    gender: "",
    course1: "",
    course2: "",
    course3: "",
    oLevelGrades: {},
    aLevelGrades: {}
  });

  // Fetch registrations
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get("http://localhost:5000/registrations")
      .then(res => {
        const data = res.data.map(student => ({
          ...student,
          gpa: calculateGPA(student.oLevelGrades, student.aLevelGrades)
        }));
        setStudents(data);
        updateCharts(data);
      });
  };

  // GPA calculation
  const calculateGPA = (oGrades = {}, aGrades = {}) => {
    const gradeMap = { "D1": 5, "D2": 4, "C3": 3, "C4": 2.5, "C5": 2, "C6": 1.5, "P7": 1, "F9": 0, "A": 5, "B": 4, "C": 3 };
    const allGrades = [...Object.values(oGrades), ...Object.values(aGrades)];
    if (allGrades.length === 0) return 0;
    const total = allGrades.reduce((sum, g) => sum + (gradeMap[g] || 0), 0);
    return (total / allGrades.length).toFixed(2);
  };

  const updateCharts = (data) => {
    const maleCount = data.filter(s => s.gender === "Male").length;
    const femaleCount = data.filter(s => s.gender === "Female").length;
    setGenderData([{ gender: "Male", count: maleCount }, { gender: "Female", count: femaleCount }]);

    const trend = data.map(s => ({ name: s.firstName + " " + s.surname, GPA: parseFloat(s.gpa) }));
    setGpaTrend(trend);
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:5000/registrations", form)
      .then(() => {
        fetchStudents();
        setModalOpen(false);
        setForm({
          firstName: "",
          surname: "",
          gender: "",
          course1: "",
          course2: "",
          course3: "",
          oLevelGrades: {},
          aLevelGrades: {}
        });
      });
  };

  return (
    <div className="dashboard-page">
      <h2>Dashboard Overview</h2>

      {/* Add Student Button */}
      <button className="add-student-btn" onClick={() => setModalOpen(true)}>Add Student</button>

      {/* Summary Cards */}
      <div className="home-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Total Students</h3>
            <BsPeopleFill className="card-icon" />
          </div>
          <h1>{students.length}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>Total Courses</h3>
            <BsBookFill className="card-icon" />
          </div>
          <h1>{students.length ? new Set(students.map(s => s.course1)).size : 0}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>Average GPA</h3>
            <BsGraphUpArrow className="card-icon" />
          </div>
          <h1>{students.length ? (students.reduce((sum, s) => sum + parseFloat(s.gpa), 0) / students.length).toFixed(2) : 0}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>Female Students</h3>
            <BsGenderFemale className="card-icon" />
          </div>
          <h1>{students.filter(s => s.gender === "Female").length}</h1>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-row">
        <div className="chart-container">
          <h3>Gender Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={genderData}>
              <XAxis dataKey="gender" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>GPA Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={gpaTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="GPA" stroke="#16a34a" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Add Student Modal */}
      <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
        <h3>Add New Student</h3>
        <form className="modal-form" onSubmit={handleSubmit}>
          <input name="firstName" placeholder="First Name" onChange={handleChange} required />
          <input name="surname" placeholder="Surname" onChange={handleChange} required />
          <select name="gender" onChange={handleChange} required>
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          <input name="course1" placeholder="First Choice Course" onChange={handleChange} required />
          <input name="course2" placeholder="Second Choice Course" onChange={handleChange} />
          <input name="course3" placeholder="Third Choice Course" onChange={handleChange} />
          <button type="submit">Save Student</button>
        </form>
      </Modal>
    </div>
  );
}

export default Dashboard;

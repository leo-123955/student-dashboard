import React from 'react';
import { BsPeopleFill, BsBookFill, BsClipboardCheckFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';

function Home() {
  // Sample data, replace with API calls later
  const totalStudents = 300;
  const totalCourses = 12;
  const totalAssignments = 30;
  const maleFemaleData = [
    { gender: 'Male', count: 224 },
    { gender: 'Female', count: 76 }
  ];
  const gpaTrendData = [
    { month: 'Jan', gpa: 3.2 },
    { month: 'Feb', gpa: 3.4 },
    { month: 'Mar', gpa: 3.6 },
    { month: 'Apr', gpa: 3.5 },
    { month: 'May', gpa: 3.7 },
  ];

  const summary = {
    avgGPA: 3.5,
    topStudent: 'John Doe',
    atRisk: 5
  };

  return (
    <div className="main-content">
      <div className="home-title">
        <h2>Welcome to Student Dashboard</h2>
        <p>Overview of student performance and registrations.</p>
      </div>

      {/* CARDS */}
      <div className="home-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Total Students</h3>
            <BsPeopleFill className="card-icon" />
          </div>
          <h1>{totalStudents}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Total Courses</h3>
            <BsBookFill className="card-icon" />
          </div>
          <h1>{totalCourses}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Total Assignments</h3>
            <BsClipboardCheckFill className="card-icon" />
          </div>
          <h1>{totalAssignments}</h1>
        </div>
      </div>

      {/* BAR CHART: Male vs Female */}
      <div style={{ marginTop: '40px' }}>
        <h3>Male vs Female Students</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={maleFemaleData}>
            <XAxis dataKey="gender" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* LINE CHART: Performance Trend */}
      <div style={{ marginTop: '40px' }}>
        <h3>GPA Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={gpaTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 4.5]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="gpa" stroke="#16a34a" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* PERFORMANCE SUMMARY */}
      <div style={{ marginTop: '40px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div className="card">
          <h3>Average GPA</h3>
          <h1>{summary.avgGPA}</h1>
        </div>
        <div className="card">
          <h3>Top Student</h3>
          <h1>{summary.topStudent}</h1>
        </div>
        <div className="card">
          <h3>Students at Risk</h3>
          <h1>{summary.atRisk}</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;

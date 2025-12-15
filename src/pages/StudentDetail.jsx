import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useParams } from "react-router-dom";

function StudentDetail() {
  const { id } = useParams(); // student id from route
  const [student, setStudent] = useState(null);
  const [gpaData, setGpaData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/registrations/${id}`)
      .then(res => {
        const data = res.data;
        setStudent(data);

        // Prepare GPA trend data
        const gpaTrend = Object.entries(data.courses || {}).map(([course, grade]) => ({
          course,
          GPA: mapGradeToGPA(grade)
        }));
        setGpaData(gpaTrend);
      });
  }, [id]);

  const mapGradeToGPA = (grade) => {
    const gradeMap = { "D1":5, "D2":4, "C3":3, "C4":2.5, "C5":2, "C6":1.5, "P7":1, "F9":0, "A":5, "B":4, "C":3 };
    return gradeMap[grade] || 0;
  };

  if (!student) return <p>Loading student details...</p>;

  return (
    <div className="student-detail-page">
      <h2>{student.firstName} {student.surname} - Details</h2>

      {/* Personal Info */}
      <div className="personal-info">
        <h3>Personal Information</h3>
        <p><strong>Age:</strong> {student.age}</p>
        <p><strong>Gender:</strong> {student.gender}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Telephone:</strong> {student.telephone}</p>
        <p><strong>Address:</strong> {student.village}, {student.parish}, {student.subCounty}, {student.district}</p>
        <p><strong>Nationality:</strong> {student.nationality}</p>
        <p><strong>Religion:</strong> {student.religion}</p>
      </div>

      {/* Courses and Grades */}
      <div className="courses-grades" style={{ marginTop: "20px" }}>
        <h3>Enrolled Courses & Grades</h3>
        <table className="students-page">
          <thead>
            <tr>
              <th>Course</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {student.courses && Object.entries(student.courses).map(([course, grade]) => (
              <tr key={course}>
                <td>{course}</td>
                <td>{grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* GPA Trend */}
      <div className="gpa-trend" style={{ marginTop: "30px" }}>
        <h3>GPA Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={gpaData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="course" />
            <YAxis domain={[0,5]} />
            <Tooltip />
            <Line type="monotone" dataKey="GPA" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StudentDetail;

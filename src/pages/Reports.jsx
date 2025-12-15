import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend, PieChart, Pie, Cell
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Reports() {
  const [students, setStudents] = useState([]);
  const [topStudents, setTopStudents] = useState([]);
  const [atRisk, setAtRisk] = useState([]);
  const [courseAvg, setCourseAvg] = useState([]);
  const [genderData, setGenderData] = useState([]);

  const reportRef = useRef();

  useEffect(() => {
    axios.get("http://localhost:5000/registrations")
      .then(res => {
        const data = res.data.map(s => ({
          ...s,
          gpa: calculateGPA(s.oLevelGrades, s.aLevelGrades)
        }));
        setStudents(data);
        updateReports(data);
      });
  }, []);

  const calculateGPA = (oGrades = {}, aGrades = {}) => {
    const gradeMap = { "D1":5, "D2":4, "C3":3, "C4":2.5, "C5":2, "C6":1.5, "P7":1, "F9":0, "A":5, "B":4, "C":3 };
    const allGrades = [...Object.values(oGrades), ...Object.values(aGrades)];
    if (!allGrades.length) return 0;
    const total = allGrades.reduce((sum, g) => sum + (gradeMap[g] || 0), 0);
    return (total / allGrades.length).toFixed(2);
  };

  const updateReports = (data) => {
    setTopStudents([...data].sort((a,b)=> b.gpa - a.gpa).slice(0,5));
    setAtRisk(data.filter(s => s.gpa < 2.5));
    const courseMap = {};
    data.forEach(s => {
      if (!courseMap[s.course1]) courseMap[s.course1] = [];
      courseMap[s.course1].push(parseFloat(s.gpa));
    });
    setCourseAvg(Object.entries(courseMap).map(([course,gpas]) => ({
      course,
      avgGPA: (gpas.reduce((a,b)=>a+b,0)/gpas.length).toFixed(2)
    })));

    const male = data.filter(s => s.gender === "Male").length;
    const female = data.filter(s => s.gender === "Female").length;
    setGenderData([{ name: "Male", value: male }, { name: "Female", value: female }]);
  };

  const COLORS = ["#2563eb", "#f43f5e"];

  // PDF Export
  const exportPDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const canvas = await html2canvas(reportRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const imgProps = doc.getImageProperties(imgData);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    doc.save("Reports.pdf");
  };
  const exportExcel = () => {
    const wb = XLSX.utils.book_new();

    const allData = students.map(s => ({
      Name: `${s.firstName} ${s.surname}`,
      Gender: s.gender,
      Course: s.course1,
      GPA: s.gpa,
      Status: s.gpa >= 2.5 ? "Active" : "At Risk"
    }));

    const ws = XLSX.utils.json_to_sheet(allData);
    XLSX.utils.book_append_sheet(wb, ws, "All Students");
    XLSX.writeFile(wb, "Students_Report.xlsx");
  };

  return (
    <div className="reports-page">
      <h2>Performance Reports</h2>
      <div style={{ marginBottom: "20px" }}>
        <button className="export-btn" onClick={exportPDF}>Export as PDF</button>
        <button className="export-btn" onClick={exportExcel}>Export as Excel</button>
      </div>

      <div ref={reportRef}>
        {/* Charts Row */}
        <div className="charts-row">
          <div className="chart-container">
            <h3>Course-wise Average GPA</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={courseAvg}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="course" />
                <YAxis domain={[0,5]} />
                <Tooltip />
                <Bar dataKey="avgGPA" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h3>Gender Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={genderData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container" style={{ marginTop: "30px" }}>
          <h3>Top 5 Students GPA Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={topStudents}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="firstName" />
              <YAxis domain={[0,5]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="gpa" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Tables */}
        <div className="reports-tables" style={{ marginTop: "30px" }}>
          <h3>All Registered Students</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Course</th>
                  <th>GPA</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id}>
                    <td>{s.firstName} {s.surname}</td>
                    <td>{s.gender}</td>
                    <td>{s.course1}</td>
                    <td>{s.gpa}</td>
                    <td>{s.gpa >= 2.5 ? "Active" : "At Risk"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;

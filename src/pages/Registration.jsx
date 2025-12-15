import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Registration() {
  const [form, setForm] = useState({
    firstName: "",
    surname: "",
    age: "",
    gender: "",
    tel: "",
    email: "",
    village: "",
    parish: "",
    subCounty: "",
    district: "",
    nationality: "",
    maritalStatus: "",
    country: "",
    parentName: "",
    sponsorship: "",
    religion: "",
    oLevelYear: "",
    oLevelSchool: "",
    oLevelIndex: "",
    oLevelGrades: {},
    aLevelYear: "",
    aLevelSchool: "",
    aLevelIndex: "",
    aLevelGrades: {},
    course1: "",
    course2: "",
    course3: "",
    howKnowUs: "",
    arrested: "",
    childAbuse: "",
    disability: "",
    disabilityDetails: ""
  });

  const subjectsO = ["English","Mathematics","CRE","Biology","Physics","Chemistry","History","ICT","Geography"];
  const subjectsA = ["Physics","Mathematics","Economics"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleGradeChange = (level, subject, value) => {
    if(level==="O") {
      setForm(prev => ({
        ...prev,
        oLevelGrades: { ...prev.oLevelGrades, [subject]: value }
      }));
    } else {
      setForm(prev => ({
        ...prev,
        aLevelGrades: { ...prev.aLevelGrades, [subject]: value }
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to JSON server
    axios.post("http://localhost:5000/registrations", form)
      .then(() => alert("Registration saved!"))
      .catch(err => console.error(err));
  };

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Student Registration", 14, 15);

    const rows = [
      ["First Name", form.firstName],
      ["Surname", form.surname],
      ["Age", form.age],
      ["Gender", form.gender],
      ["Telephone", form.tel],
      ["Email", form.email],
      ["Village", form.village],
      ["Parish", form.parish],
      ["Sub-county", form.subCounty],
      ["District", form.district],
      ["Nationality", form.nationality],
      ["Marital Status", form.maritalStatus],
      ["Country of Stay", form.country],
      ["Parent Name", form.parentName],
      ["Sponsorship", form.sponsorship],
      ["Religion", form.religion],
      ["O-Level Year", form.oLevelYear],
      ["O-Level School", form.oLevelSchool],
      ["O-Level Index", form.oLevelIndex],
      ...subjectsO.map(s => [s, form.oLevelGrades[s] || ""]),
      ["A-Level Year", form.aLevelYear],
      ["A-Level School", form.aLevelSchool],
      ["A-Level Index", form.aLevelIndex],
      ...subjectsA.map(s => [s, form.aLevelGrades[s] || ""]),
      ["Course 1", form.course1],
      ["Course 2", form.course2],
      ["Course 3", form.course3],
      ["How know us", form.howKnowUs],
      ["Ever arrested", form.arrested],
      ["Arrested child abuse", form.childAbuse],
      ["Disability", form.disability],
      ["Disability details", form.disabilityDetails]
    ];

    doc.autoTable({ head: [["Field","Value"]], body: rows, startY: 20 });
    doc.save("registration.pdf");
  };

  // Export Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet([form]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registration");
    XLSX.writeFile(workbook, "registration.xlsx");
  };

  return (
    <div className="registration-page">
      <h2>Student Registration Form</h2>
      <button onClick={exportPDF}>Export PDF</button>
      <button onClick={exportExcel}>Export Excel</button>

      <form className="registration-form" onSubmit={handleSubmit}>
        <h3>Personal Information</h3>
        <div className="form-grid">
          <input placeholder="First Name" name="firstName" onChange={handleChange} />
          <input placeholder="Surname" name="surname" onChange={handleChange} />
          <input placeholder="Age" type="number" name="age" onChange={handleChange} />
          <select name="gender" onChange={handleChange}>
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          <input placeholder="Telephone Number" name="tel" onChange={handleChange} />
          <input placeholder="Email Address" name="email" onChange={handleChange} />
          <input placeholder="Village" name="village" onChange={handleChange} />
          <input placeholder="Parish" name="parish" onChange={handleChange} />
          <input placeholder="Sub-county" name="subCounty" onChange={handleChange} />
          <input placeholder="District" name="district" onChange={handleChange} />
          <input placeholder="Nationality" name="nationality" onChange={handleChange} />
          <select name="maritalStatus" onChange={handleChange}>
            <option value="">Marital Status</option>
            <option>Single</option>
            <option>Married</option>
          </select>
          <input placeholder="Country of Stay" name="country" onChange={handleChange} />
          <input placeholder="Parent / Guardian Name" name="parentName" onChange={handleChange} />
          <input placeholder="Sponsorship (Self / Parent / Sponsor)" name="sponsorship" onChange={handleChange} />
          <input placeholder="Religion" name="religion" onChange={handleChange} />
        </div>

        <h3>O-Level</h3>
        <div className="form-grid">
          <input placeholder="Year" name="oLevelYear" onChange={handleChange} />
          <input placeholder="School" name="oLevelSchool" onChange={handleChange} />
          <input placeholder="Index Number" name="oLevelIndex" onChange={handleChange} />
        </div>
        <table className="subjects-table">
          <thead><tr><th>Subject</th><th>Grade</th></tr></thead>
          <tbody>
            {subjectsO.map(sub => (
              <tr key={sub}>
                <td>{sub}</td>
                <td><input placeholder="Grade" onChange={e=>handleGradeChange("O",sub,e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>A-Level</h3>
        <div className="form-grid">
          <input placeholder="Year" name="aLevelYear" onChange={handleChange} />
          <input placeholder="School" name="aLevelSchool" onChange={handleChange} />
          <input placeholder="Index Number" name="aLevelIndex" onChange={handleChange} />
        </div>
        <table className="subjects-table">
          <thead><tr><th>Subject</th><th>Grade</th></tr></thead>
          <tbody>
            {subjectsA.map(sub => (
              <tr key={sub}>
                <td>{sub}</td>
                <td><input placeholder="Grade" onChange={e=>handleGradeChange("A",sub,e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Course Choices</h3>
        <div className="form-grid">
          <input placeholder="First Choice Course" name="course1" onChange={handleChange} />
          <input placeholder="Second Choice Course" name="course2" onChange={handleChange} />
          <input placeholder="Third Choice Course" name="course3" onChange={handleChange} />
        </div>

        <h3>Additional Information</h3>
        <div className="form-grid">
          <input placeholder="How did you know about us?" name="howKnowUs" onChange={handleChange} />
          <select name="arrested" onChange={handleChange}>
            <option value="">Have you ever been arrested?</option>
            <option>No</option>
            <option>Yes</option>
          </select>
          <select name="childAbuse" onChange={handleChange}>
            <option value="">Arrested for child abuse?</option>
            <option>No</option>
            <option>Yes</option>
          </select>
          <select name="disability" onChange={handleChange}>
            <option value="">Do you have any disability?</option>
            <option>No</option>
            <option>Yes</option>
          </select>
          <input placeholder="If yes, specify disability" name="disabilityDetails" onChange={handleChange} />
        </div>

        <button type="submit" className="submit-btn">Submit Registration</button>
      </form>
    </div>
  );
}

export default Registration;

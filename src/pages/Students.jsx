import React, { useState } from "react";

function Students() {
  const [students, setStudents] = useState([
    {
      id: 1,
      firstName: "Alice",
      surname: "Smith",
      regNo: "REG001",
      nin: "12345678",
      age: 20,
      gender: "Female",
      course: "CS",
      subjects: [
        { name: "Inferential Statistics", marks: "" },
        { name: "Non Parametrics", marks: "" },
        { name: "IT", marks: "" },
        { name: "Communication Skills", marks: "" },
        { name: "Development Economics", marks: "" },
        { name: "Ethics, Culture & Religious Values", marks: "" },
      ],
      gpa: 0,
    },
  ]);

  const [newStudent, setNewStudent] = useState({
    firstName: "",
    surname: "",
    regNo: "",
    nin: "",
    age: "",
    gender: "",
    course: "",
    subjects: [
      { name: "", marks: "" },
      { name: "", marks: "" },
      { name: "", marks: "" },
      { name: "", marks: "" },
      { name: "", marks: "" },
      { name: "", marks: "" },
    ],
  });

  const handleMarksChange = (studentId, index, value) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const updatedSubjects = [...s.subjects];
          updatedSubjects[index].marks = value;
          const totalMarks = updatedSubjects.reduce(
            (acc, subj) => acc + Number(subj.marks || 0),
            0
          );
          s.gpa = (totalMarks / updatedSubjects.length / 20).toFixed(2);
          return { ...s, subjects: updatedSubjects };
        }
        return s;
      })
    );
  };

  const handleNewStudentChange = (field, value) => {
    setNewStudent((prev) => ({ ...prev, [field]: value }));
  };

  const handleNewSubjectChange = (index, field, value) => {
    const updatedSubjects = [...newStudent.subjects];
    updatedSubjects[index][field] = value;
    setNewStudent((prev) => ({ ...prev, subjects: updatedSubjects }));
  };

  const addStudent = () => {
    const totalMarks = newStudent.subjects.reduce(
      (acc, subj) => acc + Number(subj.marks || 0),
      0
    );
    const gpa = (totalMarks / newStudent.subjects.length / 20).toFixed(2);

    const student = {
      id: students.length + 1,
      ...newStudent,
      gpa,
    };

    setStudents([...students, student]);
    // Reset form
    setNewStudent({
      firstName: "",
      surname: "",
      regNo: "",
      nin: "",
      age: "",
      gender: "",
      course: "",
      subjects: [
        { name: "", marks: "" },
        { name: "", marks: "" },
        { name: "", marks: "" },
        { name: "", marks: "" },
        { name: "", marks: "" },
        { name: "", marks: "" },
      ],
    });
  };

  return (
    <div className="students-page">
      <h2>Students List</h2>

      {/* ADD STUDENT FORM */}
      <div className="add-student-form">
        <h3>Add New Student</h3>
        <div className="form-grid">
          <input
            placeholder="First Name"
            value={newStudent.firstName}
            onChange={(e) => handleNewStudentChange("firstName", e.target.value)}
          />
          <input
            placeholder="Surname"
            value={newStudent.surname}
            onChange={(e) => handleNewStudentChange("surname", e.target.value)}
          />
          <input
            placeholder="Reg. No"
            value={newStudent.regNo}
            onChange={(e) => handleNewStudentChange("regNo", e.target.value)}
          />
          <input
            placeholder="NIN"
            value={newStudent.nin}
            onChange={(e) => handleNewStudentChange("nin", e.target.value)}
          />
          <input
            placeholder="Age"
            type="number"
            value={newStudent.age}
            onChange={(e) => handleNewStudentChange("age", e.target.value)}
          />
          <input
            placeholder="Gender"
            value={newStudent.gender}
            onChange={(e) => handleNewStudentChange("gender", e.target.value)}
          />
          <input
            placeholder="Course"
            value={newStudent.course}
            onChange={(e) => handleNewStudentChange("course", e.target.value)}
          />
        </div>

        <h4>Subjects & Marks</h4>
        {newStudent.subjects.map((subj, idx) => (
          <div key={idx} className="form-grid">
            <input
              placeholder={`Subject ${idx + 1}`}
              value={subj.name}
              onChange={(e) =>
                handleNewSubjectChange(idx, "name", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Marks"
              value={subj.marks}
              onChange={(e) =>
                handleNewSubjectChange(idx, "marks", e.target.value)
              }
            />
          </div>
        ))}

        <button onClick={addStudent}>Add Student</button>
      </div>

      {/* STUDENT TABLE */}
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Surname</th>
            <th>Reg. No</th>
            <th>NIN</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Course</th>
            {Array.from({ length: 6 }).map((_, i) => (
              <>
                <th>Subject {i + 1}</th>
                <th>Marks {i + 1}</th>
              </>
            ))}
            <th>GPA</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.firstName}</td>
              <td>{s.surname}</td>
              <td>{s.regNo}</td>
              <td>{s.nin}</td>
              <td>{s.age}</td>
              <td>{s.gender}</td>
              <td>{s.course}</td>
              {s.subjects.map((subj, idx) => (
                <>
                  <td>{subj.name}</td>
                  <td>
                    <input
                      type="number"
                      value={subj.marks}
                      onChange={(e) => handleMarksChange(s.id, idx, e.target.value)}
                    />
                  </td>
                </>
              ))}
              <td>{s.gpa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;

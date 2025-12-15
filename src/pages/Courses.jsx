function Courses() {
  const courses = [
    // ICT & COMPUTING
    { name: "Bachelor of Computer Science", req: "UACE with Math or Physics" },
    { name: "Bachelor of Information Technology", req: "UACE with Math" },
    { name: "Diploma in Information Technology", req: "UCE with Math" },
    { name: "Diploma in Computer Science", req: "UCE with Math" },
    { name: "Certificate in Computer Applications", req: "UCE" },
    { name: "Certificate in Software Development", req: "UCE" },
    { name: "Diploma in Networking", req: "UCE with Math" },
    { name: "Diploma in Data Science", req: "UCE with Math" },

    // BUSINESS & MANAGEMENT
    { name: "Bachelor of Business Administration", req: "UACE" },
    { name: "Bachelor of Commerce", req: "UACE" },
    { name: "Bachelor of Procurement & Logistics", req: "UACE" },
    { name: "Diploma in Business Administration", req: "UCE" },
    { name: "Diploma in Procurement", req: "UCE" },
    { name: "Certificate in Business Studies", req: "UCE" },
    { name: "Certificate in Entrepreneurship", req: "UCE" },

    // ACCOUNTING & FINANCE
    { name: "Bachelor of Accounting & Finance", req: "UACE with Math" },
    { name: "Diploma in Accounting", req: "UCE with Math" },
    { name: "Certificate in Accounting", req: "UCE" },
    { name: "Certificate in Bookkeeping", req: "UCE" },

    // EDUCATION
    { name: "Bachelor of Education", req: "UACE" },
    { name: "Diploma in Primary Education", req: "UCE" },
    { name: "Diploma in Secondary Education", req: "UCE" },
    { name: "Certificate in Early Childhood Education", req: "UCE" },

    // HEALTH SCIENCES
    { name: "Bachelor of Nursing", req: "UACE with Biology" },
    { name: "Diploma in Nursing", req: "UCE with Biology" },
    { name: "Certificate in Nursing Assistant", req: "UCE" },
    { name: "Diploma in Public Health", req: "UCE" },
    { name: "Certificate in Public Health", req: "UCE" },

    // ENGINEERING & TECHNICAL
    { name: "Bachelor of Civil Engineering", req: "UACE with Math & Physics" },
    { name: "Diploma in Civil Engineering", req: "UCE with Math" },
    { name: "Diploma in Electrical Engineering", req: "UCE with Math" },
    { name: "Certificate in Electrical Installation", req: "UCE" },
    { name: "Certificate in Welding & Fabrication", req: "UCE" },

    // AGRICULTURE
    { name: "Bachelor of Agriculture", req: "UACE" },
    { name: "Diploma in Agriculture", req: "UCE" },
    { name: "Certificate in Crop Production", req: "UCE" },
    { name: "Certificate in Animal Husbandry", req: "UCE" },

    // SOCIAL SCIENCES
    { name: "Bachelor of Social Work", req: "UACE" },
    { name: "Bachelor of Development Studies", req: "UACE" },
    { name: "Diploma in Social Work", req: "UCE" },
    { name: "Certificate in Community Development", req: "UCE" },

    // LAW & GOVERNANCE
    { name: "Bachelor of Laws", req: "UACE" },
    { name: "Diploma in Law", req: "UCE" },
    { name: "Certificate in Law", req: "UCE" },

    // HOSPITALITY & TOURISM
    { name: "Bachelor of Tourism Management", req: "UACE" },
    { name: "Diploma in Hotel Management", req: "UCE" },
    { name: "Certificate in Catering", req: "UCE" },
    { name: "Certificate in Tourism", req: "UCE" },

    // MEDIA & ARTS
    { name: "Bachelor of Journalism", req: "UACE" },
    { name: "Diploma in Journalism", req: "UCE" },
    { name: "Certificate in Mass Communication", req: "UCE" },
  ];

  return (
    <div className="page">
      <h2>Courses Offered</h2>

      <table className="courses-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Course Name</th>
            <th>Minimum Entry Requirements</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{c.name}</td>
              <td>{c.req}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Courses;

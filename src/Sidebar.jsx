import React from 'react';
import { Link } from 'react-router-dom';
import {
  BsSpeedometer2,
  BsPersonCircle,
  BsClipboardCheck,
  BsBook,
  BsFillFileEarmarkTextFill,
  BsBookmarkCheck
} from 'react-icons/bs';

function Sidebar() {
  return (
    <aside id="sidebar">
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsBookmarkCheck className="icon_header" /> Student Dashboard
        </div>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/dashboard">
            <BsSpeedometer2 /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/students">
            <BsPersonCircle /> Students
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/assignments">
            <BsClipboardCheck /> Assignments
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/courses">
            <BsBook /> Courses
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/tests">
            <BsFillFileEarmarkTextFill /> Tests
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/registration">
            <BsBookmarkCheck /> Registration
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/reports">Reports</Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [cgpaFilter, setCgpaFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Function to fetch users based on the search query
  const fetchUsersBySearch = async (query) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/search", {
        search: query,
      });
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users by search:", error);
    }
  };

  // Fetch users by department
  const fetchUsersByDepartment = async (department) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/dep", {
        Department: department,
      });
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users by department:", error);
    }
  };

  // Fetch users by semester
  const fetchUsersBySemester = async (semester) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/sem", {
        semester: String(semester),
      });
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users by semester:", error);
    }
  };

  // Fetch users by CGPA
  const fetchUsersByCgpa = async (cgpa) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/cgpa", {
        CGPA: parseFloat(cgpa),
      });
      setFilteredUsers(response.data);
      console.log(response)
    } catch (error) {
      console.error("Error fetching users by CGPA:", error);
    }
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      fetchUsersBySearch(query); // Fetch users based on the search query
    } else {
      // If the search query is empty, reload the users without filtering
      setFilteredUsers([]);
    }
  };

  // Handle filtering logic based on department, semester, and CGPA
  useEffect(() => {
    if (!departmentFilter&&!semesterFilter&&!cgpaFilter) {
      fetchUsersBySearch("")
    } else if (departmentFilter) {
      fetchUsersByDepartment(departmentFilter);
    } 
    else if (semesterFilter) {
      fetchUsersBySemester(semesterFilter);
    } 
    else if (cgpaFilter) {
      fetchUsersByCgpa(cgpaFilter);
    }
  }, [departmentFilter, semesterFilter, cgpaFilter]);

  // Handle sorting users
  const filteredAndSortedUsers = Array.isArray(filteredUsers)?filteredUsers.sort((a, b) =>
      sortOrder === "asc" ? a.sname.localeCompare(b.sname) : b.sname.localeCompare(a.sname)
    ):[];

  return (
    <div className="register">
      <h1>Login Successful</h1>
      <h2>All Users</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by any field"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Filters */}
      <div>
        <label>Filter by Department:</label>
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value=="All" ? "":e.target.value)}
        >
          <option value="All">All</option>
          <option value="IT">IT</option>
          <option value="CS">CS</option>
          <option value="ECE">ECE</option>
          <option value="Mechanical">Mechanical</option>
        </select>

        <label>Filter by Semester:</label>
        <select
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>

        <label>Filter by CGPA:</label>
        <input
          type="number"
          step="0.1"
          placeholder="Enter CGPA"
          value={cgpaFilter}
          onChange={(e) => setCgpaFilter(e.target.value)}
        />
      </div>

      {/* Sorting */}
      <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
        Sort by Name ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>

      {/* Table */}
      <table border="1">
        <thead>
          <tr>
            <th>SID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Semester</th>
            <th>CGPA</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedUsers.length > 0 ? (
            filteredAndSortedUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.sid}</td>**********
                <td>{user.sname}</td>
                <td>{user.Department}</td>
                <td>{user.semester}</td>
                <td>{user.CGPA}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      <Link to="/">Back</Link>
    </div>
  );
};
export default Register
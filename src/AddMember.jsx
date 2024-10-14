import React, { useState } from "react";
import axios from "axios";

const AddMember = () => {
  const [memberName, setMemberName] = useState("");
  const [point, setPoint] = useState(0);
  const [membershipLevel, setMembershipLevel] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5500/api/members", {
        MemberName: memberName,
        Point: point,
        MembershipLevel: membershipLevel,
      });
      // Reset form fields after submission
      setMemberName("");
      setPoint(0);
      setMembershipLevel("");
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Member Name"
        value={memberName}
        onChange={(e) => setMemberName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Points"
        value={point}
        onChange={(e) => setPoint(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Membership Level"
        value={membershipLevel}
        onChange={(e) => setMembershipLevel(e.target.value)}
        required
      />
      <button type="submit">Add Member</button>
    </form>
  );
};

export default AddMember;

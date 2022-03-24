import { useAuth } from "../contexts";
import React from "react";

export function Dashboard() {
  const {  handleStateTrue} = useAuth();
  return (
    <div className="dashboard">
      <button onClick={handleStateTrue}>Click</button>
    </div>
  );
}

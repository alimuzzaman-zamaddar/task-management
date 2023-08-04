import React from "react";
import { Link } from "react-router-dom";

const NabBar = () => {
  return (
    <div className="flex h-16 items-center bg-slate-100">
        <h1 className="mr-[500px] ms-8 font-semibold text-3xl font-serif">Task Manager</h1>
      <div className="text-xl font-bold">
        <Link className="mr-5" to="/">
          All Task
        </Link>
        <Link to="/addTask">Add Task</Link>
      </div>
    </div>
  );
};

export default NabBar;

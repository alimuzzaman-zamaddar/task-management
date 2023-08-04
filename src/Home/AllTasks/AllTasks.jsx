import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPen,FaTrash } from 'react-icons/fa';
import Swal from "sweetalert2";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch("https://task-management-server-liard.vercel.app/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [tasks]);

  const handleMakeComplete = (task) => {
    fetch(`https://task-management-server-liard.vercel.app/tasks/${task._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "The Task Is Complete Now!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleDelete = (task) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://task-management-server-liard.vercel.app/tasks/${task._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
                const remaining = tasks.filter(task2 => task2._id !==task._id)
              setTasks(remaining)
              Swal.fire("Deleted!",
               "The Task has been deleted.",
                "success");
            }
          });
      }
    });
}


  return (
    <div>
        <h1 className="text-center text-6xl font-serif font-extrabold my-9">All TASKS ARE HERE</h1>
      <div className="">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-3/4 mx-auto">
            {/* head */}
            <thead>
              <tr className="text-2xl text-black">
                <th>Task Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task?.title}</td>
                  <td>{task?.desc}</td>
                  <td>{task?.status}</td>
                  <td>
                    <Link to=''>
                      <button onClick={() => handleMakeComplete(task)} className="btn btn-success bg-green-500 text-white">Complete task</button>
                    </Link>
                  </td>
                  <td>
                    <Link to=''>
                      <button onClick={() => handleDelete(task)} className="btn btn-danger bg-red-300 text-red-700 text-3xl"> <FaTrash></FaTrash> </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllTasks;

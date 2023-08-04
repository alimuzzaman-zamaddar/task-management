import React from "react";
import Swal from "sweetalert2";

const AddTask = () => {
    const handleAddTask = (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const desc = form.description.value;
        const status = form.status.value;
        

        const task = {
            title,desc,status
        }

        fetch('https://task-management-server-liard.vercel.app/tasks', {
            method: 'POST',
            headers:{
              'content-type' : 'application/json'
            },
            body: JSON.stringify(task)
          })
          .then(res => res.json())
          .then(data => {
            if(data.insertedId){
                Swal.fire(
                    'SUCCESS',
                    'Your task Is Added',
                    'successfully'
                  )
            }
          })


    }
  return (
    <div>
        <h1 className="text-center text-6xl font-extrabold mt-9">Add A Task</h1>
      <div className="card w-2/4 mx-auto">
        <form onSubmit={handleAddTask} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Task Title</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              required
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              type="text"
              placeholder="description"
              name='description'
              required
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <input
              type="text"
              name='status'
              required
              defaultValue={"incomplete"}
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-outline">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;

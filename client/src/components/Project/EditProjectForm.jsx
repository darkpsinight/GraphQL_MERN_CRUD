import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../../graphql/queries/projectsQueries";
import { UPDATE_PROJECT } from "../../graphql/mutations/project/updateProject";
import PropTypes from "prop-types";

export default function EditProjectForm({ projectData }) {
  const [name, setName] = useState(projectData.name);
  const [description, setDescription] = useState(projectData.description);
  const [status, setStatus] = useState(() => {
    switch (projectData.status) {
      case "Not Started":
        return "new";

      case "In Progress":
        return "progress";

      case "Completed":
        return "finish";

      default:
        console.log(`Unknown status ${projectData.status}`);
        return "new";
    }
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: projectData.id,
      name: name,
      description: description,
      status: status,
      refetchQueries: [
        { query: GET_PROJECT, variables: { id: projectData.id } },
      ],
    },
  });

  function onSubmit(e) {
    e.preventDefault();
    if (!name || !description || !status) {
      return alert("Please fill out all fields");
    }

    updateProject(name, description, status);
  }

  return (
    <>
      <div className="mt-5">
        <h3>Update Project Details</h3>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              id="status"
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="new">Not Started</option>
              <option value="progress">In Progress</option>
              <option value="finish">Completed</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

EditProjectForm.propTypes = {
  projectData: PropTypes.object.isRequired,
};

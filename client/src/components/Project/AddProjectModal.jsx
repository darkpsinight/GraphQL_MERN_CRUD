import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { FaList } from "react-icons/fa";
import { GET_CLIENTS } from "../../graphql/queries/clientsQueries";
import { ADD_PROJECT } from "../../graphql/mutations/project/addProject";
import { GET_PROJECTS } from "../../graphql/queries/projectsQueries";
import Spinner from "../Spinner";

export default function AddProjectModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const [clientId, setClientId] = useState("");

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
  
    update(cache, { data: { addProject } }) {
      // Read the projects from the cache using the correct syntax
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
  
      // Check if projects is null or undefined, if so, initialize it as an empty array
      const updatedProjects = projects ? [...projects, addProject] : [addProject];
  
      // Write the updated projects array back to the cache
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: updatedProjects,
        },
      });
    },
  });
  

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || description === "" || status === "" || clientId === "") {
      return alert("Please fill in all fields");
    }

    addProject({ name, description, status, clientId });

    setName("");
    setDescription("");
    setStatus("new");
    setClientId("");
  };

  if (loading) return <Spinner />;
  if (error)
    return (
      <p style={{ color: "red" }}>Something went wrong: {error.message}</p>
    );

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <span className="ms-2">New Project</span>
            </div>
          </button>

          <div
            className="modal fade"
            id="addProjectModal"
            aria-labelledby="addProjectModalLabel"
            aria-hidden="true"
            data-bs-backdrop="static"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addProjectModalLabel">
                    New Project
                  </h1>

                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body">
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

                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select
                        id="status"
                        className="form-select"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        <option value="" disabled>
                          Select Client
                        </option>

                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      data-bs-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

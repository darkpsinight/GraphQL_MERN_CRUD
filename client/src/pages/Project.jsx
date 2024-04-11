import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../graphql/queries/projectsQueries";
import ClientInfo from "../components/Client/ClientInfo";
import DeleteProjectButton from "../components/Project/DeleteProjectButton";
import { FaExclamationCircle } from "react-icons/fa";
import EditProjectForm from "../components/Project/EditProjectForm";

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <Spinner />;

  if (error) return <p>Something Went Wrong: {error.message}</p>;

  return (
    <>
      {!loading && !error && data.project ? (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>
          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>

          <h5 className="mt-3">Project Status :</h5>
          <p className="lead">{data.project.status}</p>

          <ClientInfo client={data.project.client} />

          <EditProjectForm projectData={data.project} />
          <DeleteProjectButton projectId={data.project.id} />
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
          <FaExclamationCircle className="text-info" size="5em" />
          <h1>404</h1>
          <p className="lead">
            The project you are looking for has been deleted or not found
          </p>
          <Link className="btn btn-primary" to="/">
            Back to Home
          </Link>
        </div>
      )}
    </>
  );
}

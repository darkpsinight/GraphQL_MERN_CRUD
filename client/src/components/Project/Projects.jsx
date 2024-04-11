import Spinner from "../Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../graphql/queries/projectsQueries";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;

  if (error)
    return (
      <p style={{ color: "red" }}>Something went wrong: {error.message}</p>
    );

  return (
    <>
      {data && data.projects && data.projects.length > 0 ? (
        <div className="row mt-4">
          {" "}
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}{" "}
        </div>
      ) : (
        <h2>No projects</h2>
      )}
    </>
  );
};

export default Projects;

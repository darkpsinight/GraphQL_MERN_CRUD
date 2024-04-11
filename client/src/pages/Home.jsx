import AddClientModal from "../components/Client/AddClientModal";
import Clients from "../components/Client/Clients";
import AddProjectModal from "../components/Project/AddProjectModal";
import Projects from "../components/Project/Projects";

export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
        <AddProjectModal />
      </div>
      <Projects />
      <hr />
      <Clients />
    </>
  );
}

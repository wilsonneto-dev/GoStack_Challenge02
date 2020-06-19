import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./styles.css";

const newProjectInitialValue = {
  title: "Projeto Exemplo",
  url: "github.com/teste",
  techs: [],
};

function App() {
  const [projects, setProjects] = useState();
  const [newProject, setNewProject] = useState(newProjectInitialValue);

  async function handleAddRepository() {
    const { data } = await api.post("/repositories", newProject);
    setProjects([...projects, data]);
    setNewProject(newProjectInitialValue);
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  async function fetchData() {
    const { data } = await api.get("/repositories");
    setProjects(data);
  }

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {!projects && "Loading projects..."}

        {projects?.map((project) => (
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <section>
        <h2>Adicionar novo projeto:</h2>
        <section>
          <input
            placeholder="title"
            value={newProject.title}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
          />{" "}
          <br />
          <input
            placeholder="url"
            value={newProject.url}
            onChange={(e) =>
              setNewProject({ ...newProject, url: e.target.value })
            }
          />{" "}
          <br />
          <input
            placeholder="techs"
            value={newProject.techs.join(",")}
            onChange={(e) =>
              setNewProject({
                ...newProject,
                techs: e.target.value.split(",").map((tech) => tech.trim()),
              })
            }
          />{" "}
        </section>
        <button onClick={handleAddRepository}>Adicionar</button>
      </section>
    </div>
  );
}

export default App;

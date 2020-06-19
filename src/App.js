import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [projects, setProjects] = useState();

  async function handleAddRepository() {
    // TODO
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  async function fetchData() {
    const { data } = await api.get("/repositories");
    setProjects(data);
  }

  useEffect(async () => {
    await fetchData();
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {!projects && "Loading projects..."}

        {projects?.map((project) => (
          <li>
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
          <input placeholder="title" />
          <input placeholder="url" />
          <input placeholder="techs" />
        </section>
        <button onClick={handleAddRepository}>Adicionar</button>
      </section>
    </div>
  );
}

export default App;

import React from 'react'

const Projects = ({ projects }) => {
  return (
    <div>
      <center><h1>Project List</h1></center>
      {projects.map((project) => (
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{project.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">User: {project.userId}</h6>
            <p class="card-text">{project.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
};

export default Projects

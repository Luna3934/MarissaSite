const { TransitionGroup, CSSTransition } = window.ReactTransitionGroup;
const { useState, useRef } = React;
// const { motion, AnimatePresence } = window.motion;





const projectData = [
  {
    id: 1,
    title: "Colorization Model",
    description: "Deep learning model to colorize black and white photos.",
    date: "2025-04-15",
    tags: ["AI", "Python"],
    className: "one"
  },
  {
    id: 2,
    title: "Weather Tracker",
    description: "Live weather dashboard with animated graphics.",
    date: "2025-03-01",
    tags: ["React", "API"],
    className: "two"
  },
  {
    id: 3,
    title: "Resume Site",
    description: "Personal site showcasing resume and projects.",
    date: "2025-01-10",
    tags: ["HTML", "CSS"],
    className: "three"
  }
];

function ProjectGallery() {
    const { useState, useRef } = React;
  
    const [tagFilter, setTagFilter] = useState("All");

    const filteredProjects = tagFilter === "All"
      ? projectData
      : projectData.filter(p => p.tags.includes(tagFilter));
  
    const nodeRefs = useRef([]);
  
    // Sync refs with filtered projects
    nodeRefs.current = filteredProjects.map(
      (_, i) => nodeRefs.current[i] || React.createRef()
    );
  
    const uniqueTags = ["All", ...new Set(projectData.flatMap(p => p.tags))];
  
    return (
      <div className="project-gallery">
        <div className="filter-buttons">
          {uniqueTags.map(tag => (
            <button
              key={tag}
              onClick={() => setTagFilter(tag)}
              className={tag === tagFilter ? "active" : ""}
            >
              {tag}
            </button>
          ))}
        </div>
  
        {filteredProjects.map((project, index) => {
          const direction = index % 2 === 0 ? "left" : "right";
          const key = `${project.id}-${direction}`;

          return (
            <div key={key} className={`project-wrapper ${direction}`}>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
          );
        })}


      </div>
    );
  }
  

ReactDOM.createRoot(document.getElementById("react-projects-root")).render(<ProjectGallery />);

const { TransitionGroup, CSSTransition } = window.ReactTransitionGroup;
const { useState, useRef } = React;
// const { motion, AnimatePresence } = window.motion;





const projectData = [
  {
    id: 1,
    title: "Finishing Touch Sealcoating Website",
    description: "Professional business website for a sealcoating company",
    date: "2025-04-15",
    tags: ["HTML/CSS", "JavaScript"],
    className: "one",
    image: "./img/FTSealcoatingPic.png", // Replace with your actual image path
    link: "projects/sealcoating website.html",
    imgClass: "ft-sealcoating-img"
  },
  {
    id: 2,
    title: "Senior Project:|Augmented Reality Experience",
    description: "Online Shopping App with an AR tutorial",
    date: "2025-04-15",
    tags: ["AR", "Flutter"],
    className: "one",
    image: "./img/hebuddy.gif", // Replace with your actual image path
    link: "projects/ar-experience.html"
  },
  {
    id: 3,
    title: "Apiture Internship Project",
    description: "Debugging Page",
    date: "2025-03-01",
    tags: ["SQL", "Perl", "HTML/CSS"],
    className: "two",
    image: "./img/Apiture-logo.jpg", // Replace with your actual image path
    link: "projects/internship.html"
  },
  {
    id: 4,
    title: "Boba Shop Website/POS System",
    description: "A full-stack website for a boba shop with a POS system",
    date: "2025-01-10",
    tags: ["HTML/CSS", "JavaScript","React", "SQL"],
    className: "three",
    image: "./img/boba-poster.jpeg", // Replace with your actual image path
    link: "projects/boba-shop.html",
    imgClass: "large-img"
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
            <div key={key} className={`project-card ${direction}`}>
              <img
                src={project.image}
                alt={project.title}
                className={`project-image${project.imgClass ? " " + project.imgClass : ""}`}
              />

              <h2 className="project-title">
                <a href={project.link} className="project-title-link">
                  {project.title.split("|").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </a>
              </h2>
              <p>{project.description}</p>
            </div>
          );
        })}

        


      </div>
    );
  }
  

ReactDOM.createRoot(document.getElementById("react-projects-root")).render(<ProjectGallery />);

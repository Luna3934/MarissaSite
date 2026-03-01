const { useState, useRef } = React;

const projectData = [
  {
    id: 1,
    title: "Finishing Touch Sealcoating Website",
    description: "Professional business website for a sealcoating company",
    tags: ["HTML/CSS", "JavaScript"],
    image: "./img/FTSealcoatingPic.png",
    link: "projects/sealcoating website.html",
  },
  {
    id: 2,
    title: "Senior Project: Augmented Reality Experience",
    description: "Online Shopping App with an AR tutorial",
    tags: ["AR", "Flutter"],
    image: "./img/hebuddy.gif",
    link: "projects/ar-experience.html",
  },
  {
    id: 3,
    title: "Apiture Internship Project",
    description: "Debugging Page",
    tags: ["SQL", "Perl", "HTML/CSS"],
    image: "./img/Apiture-logo.jpg",
    link: "projects/internship.html",
  },
  {
    id: 4,
    title: "Boba Shop Website / POS System",
    description: "A full-stack website for a boba shop with a POS system",
    tags: ["HTML/CSS", "JavaScript", "React", "SQL"],
    image: "./img/boba-poster.jpeg",
    link: "projects/boba-shop.html",
  },
];

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-image-wrap">
        <img src={project.image} alt={project.title} className="project-image" />
      </div>
      <div className="project-card-body">
        <div className="project-tags">
          {project.tags.map(tag => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>
        <h2 className="project-title">
          <a href={project.link}>{project.title}</a>
        </h2>
        <p className="project-description">{project.description}</p>
        <a href={project.link} className="project-link">
          View Project →
        </a>
      </div>
    </div>
  );
}

function ProjectGallery() {
  const [tagFilter, setTagFilter] = useState("All");

  const filteredProjects = tagFilter === "All"
    ? projectData
    : projectData.filter(p => p.tags.includes(tagFilter));

  const uniqueTags = ["All", ...new Set(projectData.flatMap(p => p.tags))];

  return (
    <div>
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
      <div className="project-gallery">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("react-projects-root")).render(<ProjectGallery />);
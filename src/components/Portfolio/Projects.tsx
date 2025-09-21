import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "ConfGo – Event Management Platform",
      description: "Developed core modules for event browsing, registration, billing, and checkout using React and TypeScript. Built reusable UI components with Tailwind CSS, MUI, and shadcn/ui for a scalable design system.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "MUI", "shadcn/ui", "Zustand", "React Hook Form"],
      image: "/CONFGO.png",
      github: "#",
      live: "https://confgo.com",
      featured: true
    },
    {
      title: "CRM Application for Debt Settlement",
      description: "Developed core UI modules for U.S.-based CRM using React and TypeScript, including lead listings, detail views, email workflows, and bank detail rendering with REST and GraphQL API integration.",
      technologies: ["React", "TypeScript", "Redux", "GraphQL", "Express.js", "shadcn/ui"],
      image: "/crm.png",
      github: "#",
      live: false,
      featured: true
    },
    {
      title: "Nanma Mall (E-Commerce)",
      description: "Developed core UI features for a small-scale e-commerce platform using React and Bootstrap, including product listings, details, cart, and user settings with React Query for data fetching.",
      technologies: ["React", "Bootstrap", "React Query", "React Hook Form", "REST API"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      github: "#",
      live: false,
      featured: false
    },
    {
      title: "PhyMe Learning – LMS Platform",
      description: "Built a full-stack Learning Management System from scratch using React, Next.js, and TypeScript with dynamic content system, quizzes, and note-taking features. Currently in development.",
      technologies: ["React", "Next.js", "TypeScript", "Zustand", "React Query", "Express.js", "Prisma", "PostgreSQL"],
      image: "/phymelearning.png",
      github: "#",
      live: "https://phymelearning.com",
      featured: false
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(projectsRef.current?.children || [], {
        opacity: 0,
        y: 50,
        scale: 0.9
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="bg-gradient-primary bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and the technologies I've used to solve real-world problems
          </p>
        </div>

        <div ref={projectsRef} className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.title}
              className={`group relative overflow-hidden bg-glass-bg backdrop-blur-sm border border-glass-border hover:border-primary/30 transition-all duration-300 ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              
              <div className="relative overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Project Links Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-4">
                    {/* <Button
                      size="sm"
                      className="bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground backdrop-blur-sm"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button> */}
                 { project.live && <Button
                      onClick={() => window.open(project?.live as string, "_blank")}
                      size="sm"
                      className="bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground backdrop-blur-sm"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Button>}
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold font-display group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-muted/50 text-muted-foreground text-sm rounded-full border border-border group-hover:border-primary/30 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
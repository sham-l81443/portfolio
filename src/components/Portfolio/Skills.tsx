import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    // Frontend Frameworks
    { name: "React", level: 95, category: "Frontend" },
    { name: "Next.js", level: 90, category: "Framework" },
    { name: "TypeScript", level: 88, category: "Language" },
    { name: "JavaScript", level: 95, category: "Language" },
    
    // State Management
    { name: "Redux", level: 85, category: "State Management" },
    { name: "Zustand", level: 80, category: "State Management" },
    { name: "React Query", level: 88, category: "State Management" },
    { name: "React Context", level: 92, category: "State Management" },
    
    // Styling
    { name: "Tailwind CSS", level: 92, category: "Styling" },
    { name: "Material-UI", level: 85, category: "Styling" },
    { name: "CSS/SCSS", level: 90, category: "Styling" },
    
    // Backend & Database
    { name: "Express.js", level: 80, category: "Backend" },
    { name: "Prisma", level: 75, category: "Database" },
    
    // Forms & Validation
    { name: "React Hook Form", level: 90, category: "Forms" },
    { name: "Zod", level: 85, category: "Validation" },
    
    // UI Components
    { name: "shadcn/ui", level: 88, category: "Components" },
    { name: "Radix UI", level: 82, category: "Components" },
    
    // Animation
    { name: "GSAP", level: 85, category: "Animation" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate skill cards
      gsap.fromTo(skillsRef.current?.children || [], {
        opacity: 0,
        y: 30,
        scale: 0.9
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
        }
      });

      // Animate progress bars
      skills.forEach((skill, index) => {
        const progressBar = document.querySelector(`[data-skill="${skill.name}"] .progress-fill`);
        if (progressBar) {
          gsap.fromTo(progressBar, {
            width: "0%"
          }, {
            width: `${skill.level}%`,
            duration: 1.5,
            ease: "power2.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: progressBar,
              start: "top 90%",
            }
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-20 bg-card/30 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-primary opacity-5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            My <span className="bg-gradient-primary bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of the technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div ref={skillsRef} className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <Card 
              key={skill.name}
              data-skill={skill.name}
              className="p-6 bg-glass-bg backdrop-blur-sm border border-glass-border hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-foreground">{skill.name}</h3>
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                
                <div className="mb-3">
                  <span className="text-xs text-primary font-medium">{skill.category}</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                  <div 
                    className="progress-fill h-full bg-gradient-primary rounded-full transition-all duration-300 group-hover:shadow-glow"
                    style={{ width: "0%" }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
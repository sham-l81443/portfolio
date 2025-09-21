import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats animation
      gsap.fromTo(statsRef.current?.children || [], {
        opacity: 0,
        y: 50,
        scale: 0.8
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        }
      });

      // Content animation
      gsap.fromTo(contentRef.current, {
        opacity: 0,
        x: -50
      }, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        }
      });

      // Counter animations
      const counters = document.querySelectorAll('[data-counter]');
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-counter') || '0');
        const obj = { value: 0 };
        
        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            counter.textContent = Math.round(obj.value).toString();
          },
          scrollTrigger: {
            trigger: counter,
            start: "top 80%",
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: 2, label: "Years Experience", suffix: "+" },
    { number: 10, label: "Projects Completed", suffix: "+" },
    { number: 15, label: "Technologies Mastered", suffix: "+" },
    { number: 100, label: "Client Satisfaction", suffix: "%" }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                About <span className="bg-gradient-primary bg-clip-text text-transparent">Me</span>
              </h2>
              
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Frontend Engineer with 2 years of experience building responsive, high-performance web apps using React, TypeScript, and modern JavaScript libraries. Skilled in developing scalable, accessible, and pixel-perfect UIs with a strong focus on user experience, performance, and clean architecture.
                </p>
                
                <p>
                  Adept at integrating APIs, optimizing UI workflows, and collaborating in agile teams to deliver polished, production-ready features. Known for attention to detail, code quality, and driving continuous UI/UX improvements.
                </p>
                
                <p>
                  Currently working as a Junior Software Engineer at Nivid Solutions, where I create reusable React components, manage state with Redux and Zustand, and build full-stack features with Express.js and Prisma.
                </p>
              </div>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-3">
              {["React", "Next.js", "TypeScript", "Redux", "Zustand", "React Query", "Tailwind CSS", "shadcn/ui", "Express.js", "Prisma"].map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-foreground hover:border-primary/50 transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="p-8 bg-glass-bg backdrop-blur-sm border border-glass-border hover:border-primary/30 transition-all duration-300 group">
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    <span data-counter={stat.number}>0</span>{stat.suffix}
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
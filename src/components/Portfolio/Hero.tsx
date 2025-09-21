import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial state
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current, socialRef.current], {
      opacity: 0,
      y: 50
    });

    // Animation sequence
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5")
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3")
      .to(socialRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3");

    // Floating animation for the hero
    gsap.to(heroRef.current, {
      y: -10,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />

      <div ref={heroRef} className="relative z-10 container mx-auto px-6 text-center">
        <h1
          ref={titleRef}
          className="font-display text-6xl md:text-8xl font-bold mb-6"
        >
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Frontend
          </span>{" "}
          <span className="text-foreground"> Engineer</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Frontend Engineer with <span className="text-primary font-semibold">2+ years</span> of experience
          building responsive, high-performance web apps using React, TypeScript, and modern JavaScript libraries.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300 px-8 py-6 text-lg font-semibold"
            onClick={scrollToProjects}
          >
            View My Work
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/resume.pdf'; // Make sure your PDF is named resume.pdf in public folder
              link.download = 'Shameel_K_Resume.pdf'; // This will be the downloaded filename
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="border-border hover:bg-card hover:text-card-foreground px-8 py-6 text-lg font-semibold transition-all duration-300"
          >
            Download Resume
          </Button>
        </div>

        <div ref={socialRef} className="flex justify-center gap-6">
          <Button
            onClick={() => window.open("https://github.com/sham-l81443", "_blank")}
            variant="ghost"
            size="lg"
            className="rounded-full w-14 h-14 hover:bg-primary/10 hover:text-primary transition-colors duration-300"
          >
            <Github className="h-6 w-6" />
          </Button>

          <Button
            onClick={() => window.open("https://www.linkedin.com/in/shameelk", "_blank")}
            variant="ghost"
            size="lg"
            className="rounded-full w-14 h-14 hover:bg-primary/10 hover:text-primary transition-colors duration-300"
          >
            <Linkedin className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={() => window.open("mailto:shameel81443@gmail.com", "_blank")}
            className="rounded-full w-14 h-14 hover:bg-primary/10 hover:text-primary transition-colors duration-300"
          >
            <Mail className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-1 h-8 bg-gradient-primary rounded-full opacity-60"></div>
      </div>
    </section>
  );
};

export default Hero;
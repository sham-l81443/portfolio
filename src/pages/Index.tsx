import Navigation from "@/components/Portfolio/Navigation";
import Hero from "@/components/Portfolio/Hero";
import About from "@/components/Portfolio/About";
import Skills from "@/components/Portfolio/Skills";
import Projects from "@/components/Portfolio/Projects";
import Contact from "@/components/Portfolio/Contact";
import MouseFollower from "@/components/Portfolio/MouseFollower";

const Index = () => {
  return (
    <div id="home" className="min-h-screen bg-background">
      <MouseFollower />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
};

export default Index;

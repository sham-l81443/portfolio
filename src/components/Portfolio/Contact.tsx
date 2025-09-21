import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();


  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "shameel81443@gmail.com",
      description: "Send me an email anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 6238830867",
      // description: "Available Mon-Fri 9AM-6PM"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Kannur, Kerala, India",
      description: "Open to remote work"
    }
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-card/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Let's <span className="bg-gradient-primary bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to start your next project? I'd love to hear from you and discuss how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-12 items-start">
          {/* Contact Form */}


          {/* Contact Information */}
          <div ref={contactInfoRef} className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card 
                key={info.title}
                className="p-6 bg-glass-bg backdrop-blur-sm border border-glass-border hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-1">
                      {info?.title}
                    </h3>
                    <p className="text-primary font-medium mb-1">
                      {info?.value}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {info?.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
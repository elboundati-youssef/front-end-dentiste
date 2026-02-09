import { useRef, useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Calendar,
  Sparkles,
  Shield,
  Heart,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { appointmentService } from "../services/appointment";

gsap.registerPlugin(ScrollTrigger);

// --- 1. MISE À JOUR DES DONNÉES DE CONTACT EXACTES ---
const contactInfo = [
  {
    icon: MapPin,
    label: "Adresse",
    value:
      "Avenue Moulay Youssef, n°69. 3ème étage, Appt 7 (à côté de la Mosquée Badr), Tanger, Maroc.",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+212 5 39 35 51 33",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@alboughaz.dental",
  },
  {
    icon: Clock,
    label: "Horaires",
    value: "Lun-Ven : 09h00 - 18h00 | Sam : 10h00 - 14h00",
  },
];

const features = [
  {
    icon: Calendar,
    title: "Rendez-vous Rapide",
    description: "Prise en charge simplifiée.",
  },
  {
    icon: Sparkles,
    title: "Technologie Laser",
    description: "Soins moins invasifs et plus rapides.",
  },
  {
    icon: Shield,
    title: "Expertise Locale",
    description: "Plus de 10 ans au service de Tanger.",
  },
  {
    icon: Heart,
    title: "Confort du Patient",
    description: "Une approche sans douleur.",
  },
];

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: "",
    terms: false,
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        ".contact-info-item",
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        formContainerRef.current,
        { opacity: 0, x: 80, rotateY: 5 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formContainerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        ".form-field",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formContainerRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        ".decorative-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const payload = {
      full_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      preferred_date: formData.date,
      service: formData.service,
      message: formData.message,
      terms_accepted: formData.terms,
    };

    try {
      await appointmentService.create(payload);
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        message: "",
        terms: false,
      });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="decorative-line absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-primary to-transparent origin-left" />
        <div className="decorative-line absolute bottom-1/3 right-0 w-48 h-px bg-gradient-to-l from-primary to-transparent origin-right" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header - AGRANDI sur mobile */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-4 mb-8 lg:mb-6">
            <div className="w-16 lg:w-12 h-px bg-primary" />
            <span className="text-lg lg:text-sm font-medium tracking-[0.3em] uppercase text-gradient">
              Prendre Rendez-vous
            </span>
            <div className="w-16 lg:w-12 h-px bg-primary" />
          </div>
          <h2 className="font-serif text-6xl lg:text-5xl xl:text-7xl font-medium text-foreground mb-8 lg:mb-6 leading-tight">
            Planifiez votre Sourire Parfait
            <br />
            <span className="text-gradient">Consultation Dentaire</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-2xl lg:text-xl leading-relaxed">
            Découvrez des soins dentaires d'exception. Réservez votre
            consultation dès aujourd'hui et faites le premier pas vers le
            sourire que vous méritez.
          </p>
        </div>

        {/* Features Grid - AGRANDIES sur mobile */}
        <div
          ref={featuresRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 mb-16 lg:mb-24"
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card group p-8 lg:p-8 bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-glow"
            >
              <div className="w-16 h-16 lg:w-14 lg:h-14 flex items-center justify-center bg-primary/10 text-primary mb-5 lg:mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                <feature.icon className="w-8 h-8 lg:w-6 lg:h-6" />
              </div>
              <h4 className="font-serif text-2xl lg:text-xl font-medium text-foreground mb-3 lg:mb-2">
                {feature.title}
              </h4>
              <p className="text-lg lg:text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Conteneur Centré pour Info & Map */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            
            {/* Colonne 1 : Informations de Contact - AGRANDIES sur mobile */}
            <div ref={contactInfoRef} className="flex flex-col justify-center gap-8 lg:gap-6 bg-card p-10 lg:p-12 border border-border rounded-lg shadow-sm h-full">
              <div className="mb-4">
                <h3 className="font-serif text-4xl lg:text-3xl font-medium text-foreground mb-6 lg:mb-4">
                  Contactez-nous
                </h3>
                <p className="text-muted-foreground text-2xl lg:text-base leading-relaxed">
                  Vous avez des questions ? Nous sommes là pour vous aider dans votre parcours vers une meilleure santé bucco-dentaire.
                </p>
              </div>

              {contactInfo.map((item) => (
                <div key={item.label} className="contact-info-item group flex items-start gap-5 lg:gap-4 p-6 lg:p-4 bg-background border border-border hover:border-primary/50 transition-all duration-500 rounded-md">
                  <div className="w-16 h-16 lg:w-12 lg:h-12 flex items-center justify-center bg-primary/10 text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 rounded-full">
                    <item.icon className="w-8 h-8 lg:w-5 lg:h-5" />
                  </div>
                  <div>
                    <div className="text-lg lg:text-sm text-primary font-medium tracking-wide uppercase mb-2 lg:mb-1">
                      {item.label}
                    </div>
                    <div className="text-foreground text-xl lg:text-base leading-relaxed">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Colonne 2 : Carte Google Maps - HAUTEUR AGRANDIE sur mobile */}
            <div className="h-[700px] lg:h-auto min-h-[700px] lg:min-h-[500px] bg-card border border-border rounded-lg overflow-hidden shadow-sm relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.1786107148555!2d-5.810737024895737!3d35.770988672558495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b817dbc95382b%3A0xd578b423d9ff5568!2sCentre%20Dentaire%20Al%20Boughaz.%20DR%20khanboubi%20amine!5e0!3m2!1sfr!2sma!4v1770374968608!5m2!1sfr!2sma"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Centre Dentaire Al Boughaz"
                className="grayscale hover:grayscale-0 transition-all duration-700 w-full h-full"
              />
              
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur px-6 py-3 lg:px-4 lg:py-2 text-lg lg:text-xs font-medium border border-border rounded shadow flex items-center gap-2">
                 📍 Centre Dentaire Al Boughaz – Tanger
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
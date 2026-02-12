import { useRef, useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Calendar, Sparkles, Shield, Heart, CheckCircle, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { appointmentService } from "../services/appointment";

gsap.registerPlugin(ScrollTrigger);

// --- 1. TES DONNÉES (Tanger) ---
const contactInfo = [
  { 
    icon: MapPin, 
    label: 'Adresse', 
    value: 'Avenue Moulay Youssef, n°69. 3ème étage, Appt 7 (à côté de la Mosquée Badr), Tanger.' 
  },
  { 
    icon: Phone, 
    label: 'Téléphone', 
    value: '+212 5 39 35 51 33' 
  },
  { 
    icon: Mail, 
    label: 'Email', 
    value: 'contact@alboughaz.dental' 
  },
  { 
    icon: Clock, 
    label: 'Horaires', 
    value: 'Lun-Ven: 09h00 - 18h00, Sam: 10h00 - 14h00' 
  },
];

const features = [
  { icon: Calendar, title: 'Rendez-vous Rapide', description: 'Prise en charge simplifiée.' },
  { icon: Sparkles, title: 'Technologie Laser', description: 'Soins modernes et moins invasifs.' },
  { icon: Shield, title: 'Expertise Locale', description: 'Plus de 10 ans d\'expérience.' },
  { icon: Heart, title: 'Patient D\'abord', description: 'Votre confort est notre priorité.' },
];

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: '',
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Features stagger animation
      gsap.fromTo(
        '.feature-card',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Contact info slide in
      gsap.fromTo(
        '.contact-info-item',
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form container reveal
      gsap.fromTo(
        formContainerRef.current,
        { opacity: 0, x: 80, rotateY: 5 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formContainerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form fields stagger
      gsap.fromTo(
        '.form-field',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formContainerRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Decorative line animations
      gsap.fromTo(
        '.decorative-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
        await appointmentService.create({
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            preferred_date: formData.date,
            service: formData.service,
            message: formData.message,
            terms_accepted: true // On assume true pour simplifier l'UX mobile
        });
        setStatus("success");
        setFormData({ name: '', email: '', phone: '', service: '', date: '', message: '' });
        setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
        console.error(error);
        setStatus("error");
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="decorative-line absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-primary to-transparent origin-left" />
        <div className="decorative-line absolute bottom-1/3 right-0 w-48 h-px bg-gradient-to-l from-primary to-transparent origin-right" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-primary" />
            <span className="text-sm font-medium tracking-[0.3em] uppercase text-primary">
              Prendre Rendez-vous
            </span>
            <div className="w-12 h-px bg-primary" />
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-7xl font-medium text-foreground mb-6 leading-tight">
            Planifiez votre Sourire Parfait<br />
            <span className="text-primary">Consultation Dentaire</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg lg:text-xl">
           Découvrez des soins dentaires d'exception. Réservez votre consultation dès aujourd'hui et faites le premier pas vers le sourire que vous méritez.
          </p>
        </div>

        {/* Features Grid */}
        <div ref={featuresRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16 lg:mb-24">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card group p-6 lg:p-8 bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-glow"
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                <feature.icon className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <h4 className="font-serif text-lg lg:text-xl font-medium text-foreground mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div ref={contactInfoRef} className="lg:col-span-2 space-y-6">
            <div className="mb-8">
              <h3 className="font-serif text-2xl lg:text-3xl font-medium text-foreground mb-4">
                Contactez-nous
              </h3>
              <p className="text-muted-foreground">
                Une question ? Nous sommes là pour vous aider dans votre parcours de soins.
              </p>
            </div>

            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="contact-info-item group flex items-start gap-4 p-4 bg-card border border-border hover:border-primary/50 transition-all duration-500"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-primary font-medium tracking-wide uppercase mb-1">{item.label}</div>
                  <div className="text-foreground text-sm lg:text-base">{item.value}</div>
                </div>
              </div>
            ))}

            {/* Map (Remplacée par l'iframe Google Maps de Tanger pour être utile) */}
            <div className="contact-info-item relative h-48 lg:h-64 overflow-hidden group rounded-xl border border-border">
               <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.1786107148555!2d-5.810737024895737!3d35.770988672558495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b817dbc95382b%3A0xd578b423d9ff5568!2sCentre%20Dentaire%20Al%20Boughaz.%20DR%20khanboubi%20amine!5e0!3m2!1sfr!2sma!4v1770374968608!5m2!1sfr!2sma"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Carte Centre Dentaire Al Boughaz"
                    className="grayscale hover:grayscale-0 transition-all duration-700 w-full h-full"
                />
            </div>
          </div>

          {/* Contact Form */}
          <div
            ref={formContainerRef}
            className="lg:col-span-3 bg-card border border-border p-8 lg:p-12 relative overflow-hidden"
          >
            {/* Form decorative corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/5 to-transparent" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <Calendar className="w-6 h-6 text-primary" />
                <h3 className="font-serif text-2xl lg:text-3xl font-medium text-foreground">
                  Demande de Consultation
                </h3>
              </div>

              {status === "success" ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
                      <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                          <CheckCircle className="w-10 h-10" />
                      </div>
                      <h4 className="text-2xl font-bold text-foreground mb-2">Demande Envoyée !</h4>
                      <p className="text-muted-foreground">Nous vous recontacterons sous 24h.</p>
                  </div>
              ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="form-field">
                        <label className="block text-sm text-primary font-medium tracking-wide uppercase mb-2">Nom Complet</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-4 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-glow transition-all duration-300"
                          placeholder="Votre nom"
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label className="block text-sm text-primary font-medium tracking-wide uppercase mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-4 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-glow transition-all duration-300"
                          placeholder="exemple@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="form-field">
                        <label className="block text-sm text-primary font-medium tracking-wide uppercase mb-2">Téléphone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-4 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-glow transition-all duration-300"
                          placeholder="06 00 00 00 00"
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label className="block text-sm text-primary font-medium tracking-wide uppercase mb-2">Date Souhaitée</label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-4 py-4 bg-background border border-border text-foreground focus:outline-none focus:border-primary focus:shadow-glow transition-all duration-300"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label className="block text-sm text-primary font-medium tracking-wide uppercase mb-2">Type de Soin</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-4 bg-background border border-border text-foreground focus:outline-none focus:border-primary focus:shadow-glow transition-all duration-300"
                      >
                        <option value="">Sélectionner un motif...</option>
                        <option value="Consultation">Consultation Générale</option>
                        <option value="Esthétique">Esthétique Dentaire</option>
                        <option value="Implant">Implantologie</option>
                        <option value="Orthodontie">Orthodontie</option>
                        <option value="Urgence">Urgence</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label className="block text-sm text-primary font-medium tracking-wide uppercase mb-2">Message</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-4 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-glow transition-all duration-300 resize-none"
                        placeholder="Détaillez votre besoin..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="form-field group w-full py-5 bg-gradient-gold text-primary-foreground font-medium text-lg inline-flex items-center justify-center gap-3 hover:bg-foreground hover:text-background transition-all duration-500 hover:shadow-glow disabled:opacity-70"
                    >
                      {status === "loading" ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                          <>
                              <span>Confirmer le Rendez-vous</span>
                              <Send className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                          </>
                      )}
                    </button>

                    <p className="form-field text-center text-sm text-muted-foreground">
                      Nous confirmons généralement les rendez-vous sous 24h.
                    </p>
                  </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
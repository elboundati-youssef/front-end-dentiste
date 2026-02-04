import { useRef, useState, useEffect } from 'react';
// J'ai ajouté CheckCircle et AlertCircle pour les messages de succès/erreur
import { MapPin, Phone, Mail, Clock, Send, Calendar, Sparkles, Shield, Heart, CheckCircle, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Assurez-vous que ce chemin est correct
import { appointmentService } from '../services/appointment';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { icon: MapPin, label: 'Address', value: '123 Dental Street, Berlin 10115, Germany' },
  { icon: Phone, label: 'Phone', value: '+1 (234) 567-890' },
  { icon: Mail, label: 'Email', value: 'hello@rifi.dental' },
  { icon: Clock, label: 'Hours', value: 'Mon-Fri: 9AM-6PM, Sat: 10AM-2PM' },
];

const features = [
  { icon: Calendar, title: 'Easy Scheduling', description: 'Book your appointment in minutes' },
  { icon: Sparkles, title: 'Modern Care', description: 'Latest technology & techniques' },
  { icon: Shield, title: 'Safe & Trusted', description: '20+ years of excellence' },
  { icon: Heart, title: 'Patient First', description: 'Your comfort is our priority' },
];

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  // 1. AJOUT de l'état "terms" et "status"
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: '',
    terms: false // Important pour le backend
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse', }, });
      // Features stagger animation
      gsap.fromTo('.feature-card', { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.2)', scrollTrigger: { trigger: featuresRef.current, start: 'top 75%', toggleActions: 'play none none reverse', }, });
      // Contact info slide in
      gsap.fromTo('.contact-info-item', { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: contactInfoRef.current, start: 'top 80%', toggleActions: 'play none none reverse', }, });
      // Form container reveal
      gsap.fromTo(formContainerRef.current, { opacity: 0, x: 80, rotateY: 5 }, { opacity: 1, x: 0, rotateY: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: formContainerRef.current, start: 'top 75%', toggleActions: 'play none none reverse', }, });
      // Form fields stagger
      gsap.fromTo('.form-field', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: formContainerRef.current, start: 'top 60%', toggleActions: 'play none none reverse', }, });
      // Decorative line animations
      gsap.fromTo('.decorative-line', { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power3.inOut', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse', }, });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 2. LOGIQUE DE SOUMISSION API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // On prépare les données exactement comme le backend (Migration) le demande
    const payload = {
        full_name: formData.name,       // Backend: full_name
        email: formData.email,          // Backend: email
        phone: formData.phone,          // Backend: phone
        preferred_date: formData.date,  // Backend: preferred_date
        service: formData.service,      // Backend: service
        message: formData.message,      // Backend: message
        terms_accepted: formData.terms  // Backend: terms_accepted
    };

    try {
        await appointmentService.create(payload);
        setStatus('success');
        
        // On vide le formulaire
        setFormData({ name: '', email: '', phone: '', service: '', date: '', message: '', terms: false });
        
        // On remet le statut à zéro après 5 secondes
        setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
        console.error("Erreur d'envoi", error);
        setStatus('error');
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
              Book Your Visit
            </span>
            <div className="w-12 h-px bg-primary" />
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-7xl font-medium text-foreground mb-6 leading-tight">
            Schedule Your<br />
            <span className="text-primary">Perfect Smile</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg lg:text-xl">
            Experience exceptional dental care. Book your consultation today and take the first step towards the smile you deserve.
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
                Get in Touch
              </h3>
              <p className="text-muted-foreground">
                Have questions? We're here to help you on your journey to better oral health.
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
                  <div className="text-foreground">{item.value}</div>
                </div>
              </div>
            ))}

            {/* Map */}
            <div className="contact-info-item relative h-48 lg:h-64 overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                alt="Map"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-primary text-primary-foreground font-medium hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-105"
                >
                  View on Map
                </a>
              </div>
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
                  Request Appointment
                </h3>
              </div>

              {/* 3. MESSAGES DE FEEDBACK UI */}
              {status === 'success' && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-600 rounded flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Appointment request sent successfully! We will contact you shortly.</span>
                </div>
              )}
              {status === 'error' && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-600 rounded flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>Something went wrong. Please check your connection and try again.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-field">
                    <label className="block text-sm text-primary font-medium tracking-wide uppercase mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-4 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-glow transition-all duration-300"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label className="block text-sm text-primary font-medium tracking-wide uppercase mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-4 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-glow transition-all duration-300"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-field">
                    <label className="block text-sm text-primary font-medium tracking-wide uppercase mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-4 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-glow transition-all duration-300"
                      placeholder="+1 (234) 567-890"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label className="block text-sm text-primary font-medium tracking-wide uppercase mb-2">Preferred Date</label>
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
                  <label className="block text-sm text-primary font-medium tracking-wide uppercase mb-2">Service Interested In</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-4 bg-background border border-border text-foreground focus:outline-none focus:border-primary focus:shadow-glow transition-all duration-300"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                    <option value="Preventive Care">Preventive Care</option>
                    <option value="Orthodontics">Orthodontics</option>
                    <option value="Dental Implants">Dental Implants</option>
                    <option value="Pediatric Dentistry">Pediatric Dentistry</option>
                    <option value="Emergency Care">Emergency Care</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="block text-sm text-primary font-medium tracking-wide uppercase mb-2">Your Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-4 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-glow transition-all duration-300 resize-none"
                    placeholder="Tell us about your dental needs..."
                    required
                  />
                </div>

                {/* 4. AJOUT DE LA CHECKBOX TERMS (Obligatoire) */}
                <div className="form-field flex items-start gap-3">
                    <input 
                        type="checkbox" 
                        id="terms"
                        checked={formData.terms}
                        onChange={(e) => setFormData({...formData, terms: e.target.checked})}
                        className="mt-1 w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                        required 
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                        I agree to the <a href="#" className="text-primary hover:underline">Terms and Conditions</a> and consent to the processing of my personal data.
                    </label>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="form-field group w-full py-5 bg-primary text-primary-foreground font-medium text-lg inline-flex items-center justify-center gap-3 hover:bg-foreground hover:text-background transition-all duration-500 hover:shadow-glow disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span>{status === 'loading' ? 'Sending...' : 'Book Appointment'}</span>
                  <Send className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </button>

                <p className="form-field text-center text-sm text-muted-foreground">
                  We'll confirm your appointment within 24 hours
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
import { useRef, useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Calendar, Sparkles, Shield, Heart, CheckCircle, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { appointmentService } from '../services/appointment';

gsap.registerPlugin(ScrollTrigger);

// Traduction des labels de contact
const contactInfo = [
  { icon: MapPin, label: 'Adresse', value: 'Avenue Moulay Youssef, n°69. 3ème étage, Appt 7 (à côté de la Mosquée Badr), Tanger, Maroc.' },
  { icon: Phone, label: 'Téléphone', value: '+212 5 39 35 51 33' },
  { icon: Mail, label: 'Email', value: 'contact@alboughaz.dental' },
  { icon: Clock, label: 'Horaires', value: 'Lun-Ven : 09h00 - 18h00 | Sam : 10h00 - 14h00' },
];

const features = [
  { icon: Calendar, title: 'Rendez-vous Rapide', description: 'Prise en charge simplifiée.' },
  { icon: Sparkles, title: 'Technologie Laser', description: 'Soins moins invasifs et plus rapides.' },
  { icon: Shield, title: 'Expertise Locale', description: 'Plus de 10 ans au service de Tanger.' },
  { icon: Heart, title: 'Confort du Patient', description: 'Une approche sans douleur.' },
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
    terms: false 
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse', }, });
      gsap.fromTo('.feature-card', { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.2)', scrollTrigger: { trigger: featuresRef.current, start: 'top 75%', toggleActions: 'play none none reverse', }, });
      gsap.fromTo('.contact-info-item', { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: contactInfoRef.current, start: 'top 80%', toggleActions: 'play none none reverse', }, });
      gsap.fromTo(formContainerRef.current, { opacity: 0, x: 80, rotateY: 5 }, { opacity: 1, x: 0, rotateY: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: formContainerRef.current, start: 'top 75%', toggleActions: 'play none none reverse', }, });
      gsap.fromTo('.form-field', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: formContainerRef.current, start: 'top 60%', toggleActions: 'play none none reverse', }, });
      gsap.fromTo('.decorative-line', { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power3.inOut', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse', }, });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const payload = {
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        preferred_date: formData.date,
        service: formData.service,
        message: formData.message,
        terms_accepted: formData.terms
    };

    try {
        await appointmentService.create(payload);
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', service: '', date: '', message: '', terms: false });
        setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
        setStatus('error');
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="decorative-line absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-primary to-transparent origin-left" />
        <div className="decorative-line absolute bottom-1/3 right-0 w-48 h-px bg-gradient-to-l from-primary to-transparent origin-right" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Traduit */}
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
            <div key={feature.title} className="feature-card group p-6 lg:p-8 bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-glow">
              <div className="w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                <feature.icon className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <h4 className="font-serif text-lg lg:text-xl font-medium text-foreground mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info Traduit */}
          <div ref={contactInfoRef} className="lg:col-span-2 space-y-6">
            <div className="mb-8">
              <h3 className="font-serif text-2xl lg:text-3xl font-medium text-foreground mb-4">
                Contactez-nous
              </h3>
              <p className="text-muted-foreground">
                Vous avez des questions ? Nous sommes là pour vous aider dans votre parcours vers une meilleure santé bucco-dentaire.
              </p>
            </div>

            {contactInfo.map((item) => (
              <div key={item.label} className="contact-info-item group flex items-start gap-4 p-4 bg-card border border-border hover:border-primary/50 transition-all duration-500">
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
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" alt="Localisation" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-primary text-primary-foreground font-medium hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-105">
                  Voir sur la Carte
                </a>
              </div>
            </div>
          </div>

          {/* Formulaire de Contact Traduit */}
          <div ref={formContainerRef} className="lg:col-span-3 bg-card border border-border p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <Calendar className="w-6 h-6 text-primary" />
                <h3 className="font-serif text-2xl lg:text-3xl font-medium text-foreground">
                  Demande de Rendez-vous
                </h3>
              </div>

              {status === 'success' && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-600 rounded flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Demande envoyée avec succès ! Nous vous contacterons rapidement.</span>
                </div>
              )}
              {status === 'error' && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-600 rounded flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>Une erreur est survenue. Veuillez vérifier votre connexion.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-field">
                    <label className="block text-sm text-primary font-medium tracking-wide uppercase mb-2">Nom Complet</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-4 bg-background border border-border text-foreground focus:outline-none focus:border-primary transition-all duration-300" placeholder="Votre nom" required />
                  </div>
                  <div className="form-field">
                    <label className="block text-sm text-primary font-medium tracking-wide uppercase mb-2">Adresse Email</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-4 bg-background border border-border text-foreground focus:outline-none focus:border-primary transition-all duration-300" placeholder="exemple@mail.com" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-field">
                    <label className="block text-sm text-primary font-medium tracking-wide uppercase mb-2">Numéro de Téléphone</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-4 bg-background border border-border text-foreground focus:outline-none focus:border-primary transition-all duration-300" placeholder="+212 6..." required />
                  </div>
                 <div className="form-field">
  <label className="block text-sm text-primary font-medium tracking-wide uppercase mb-2">
    Date Souhaitée
  </label>
  <input 
    type="date" 
    value={formData.date} 
    onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
    className="w-full px-4 py-4 bg-background border border-border text-foreground focus:outline-none focus:border-primary transition-all duration-300 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70 hover:[&::-webkit-calendar-picker-indicator]:opacity-100" 
    required 
  />
</div>
                </div>

                <div className="form-field">
                  <label className="block text-sm text-primary font-medium tracking-wide uppercase mb-2">Service Intéressé</label>
                  <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className="w-full px-4 py-4 bg-background border border-border text-foreground focus:outline-none focus:border-primary transition-all duration-300" required >
                    <option value="">Sélectionnez un service</option>
                    <option value="Esthétique Dentaire">Esthétique Dentaire & Facettes</option>
                    <option value="Blanchiment">Blanchiment Professionnel</option>
                    <option value="Orthodontie">Orthodontie & Aligneurs</option>
                    <option value="Implantologie">Implantologie & Prothèses</option>
                    <option value="Pédiatrie">Dentisterie Pédiatrique</option>
                    <option value="Urgence">Urgence Dentaire Tanger</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="block text-sm text-primary font-medium tracking-wide uppercase mb-2">Votre Message</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} className="w-full px-4 py-4 bg-background border border-border text-foreground focus:outline-none focus:border-primary transition-all duration-300 resize-none" placeholder="Décrivez votre besoin..." required />
                </div>

                <div className="form-field flex items-start gap-3">
                    <input type="checkbox" id="terms" checked={formData.terms} onChange={(e) => setFormData({...formData, terms: e.target.checked})} className="mt-1 w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary" required />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                        J'accepte les <a href="#" className="text-primary hover:underline">Conditions Générales</a> et je consens au traitement de mes données personnelles.
                    </label>
                </div>

                <button type="submit" disabled={status === 'loading'} className="form-field group w-full py-5 bg-primary text-primary-foreground font-medium text-lg inline-flex items-center justify-center gap-3 hover:bg-foreground hover:text-background transition-all duration-500 disabled:opacity-70">
                  <span>{status === 'loading' ? 'Envoi en cours...' : 'Prendre Rendez-vous'}</span>
                  <Send className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </button>

                <p className="form-field text-center text-sm text-muted-foreground">
                  Nous confirmerons votre rendez-vous sous 24 heures.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
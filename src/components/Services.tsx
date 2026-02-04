import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Sparkles, Shield, Smile, Activity, Heart, Zap } from 'lucide-react';

const services = [
  {
    icon: Sparkles,
    title: 'Cosmetic Dentistry',
    description: 'Transform your smile with veneers, whitening, and aesthetic treatments.',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&q=80',
  },
  {
    icon: Shield,
    title: 'Preventive Care',
    description: 'Regular check-ups, cleanings, and early detection to maintain oral health.',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80',
  },
  {
    icon: Smile,
    title: 'Orthodontics',
    description: 'Invisible aligners and braces for perfectly straight teeth.',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80',
  },
  {
    icon: Activity,
    title: 'Dental Implants',
    description: 'Permanent tooth replacement solutions that look and feel natural.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80',
  },
  {
    icon: Heart,
    title: 'Pediatric Dentistry',
    description: 'Gentle, kid-friendly care to establish healthy habits early.',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80',
  },
  {
    icon: Zap,
    title: 'Emergency Care',
    description: '24/7 emergency services for urgent dental needs.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80',
  },
];

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
            Our Services
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground mb-6">
            Comprehensive Dental Care
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            From routine check-ups to advanced cosmetic procedures, we offer a full range 
            of dental services to meet all your oral health needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative overflow-hidden bg-background cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-8">
                <div className="w-14 h-14 flex items-center justify-center bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-medium text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 border border-transparent group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

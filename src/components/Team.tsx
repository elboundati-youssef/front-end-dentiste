import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Linkedin, Mail } from 'lucide-react';

const team = [
  {
    name: 'Dr. Emma Schmidt',
    role: 'Lead Dentist & Founder',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80',
    specialty: 'Cosmetic Dentistry',
  },
  {
    name: 'Dr. Michael Weber',
    role: 'Orthodontist',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80',
    specialty: 'Invisalign Specialist',
  },
  {
    name: 'Dr. Sarah König',
    role: 'Oral Surgeon',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80',
    specialty: 'Dental Implants',
  },
  {
    name: 'Dr. Thomas Müller',
    role: 'Pediatric Dentist',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80',
    specialty: 'Children\'s Care',
  },
];

export const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 lg:mb-24"
        >
          <div>
            <span className="text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
              Our Team
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground">
              Meet the Experts
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground mt-6 lg:mt-0">
            Our team of experienced professionals is dedicated to providing the highest 
            quality dental care in a comfortable environment.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              {/* Image */}
              <div className="relative overflow-hidden mb-6 image-zoom">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-[3/4] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
                
                {/* Social Links */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <a
                    href="#"
                    className="w-10 h-10 flex items-center justify-center bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 flex items-center justify-center bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Info */}
              <div>
                <h3 className="font-serif text-xl font-medium text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.specialty}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

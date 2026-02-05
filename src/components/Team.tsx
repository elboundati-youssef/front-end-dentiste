import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, GraduationCap, Stethoscope, Linkedin, Mail } from 'lucide-react';

export const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Header style du premier code */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 lg:mb-24"
        >
          <div>
            <span className="text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
              Notre Expertise
            </span>

            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground">
              Rencontrez le&nbsp;Dr.&nbsp;Amine&nbsp;Khanboubi
            </h2>
            <br></br>
            
            <p className="max-w-md text-muted-foreground mt-6 lg:mt-0">
            Un parcours d'excellence dédié à la santé et à la beauté de votre sourire à Tanger.
          </p>
          </div>

          
        </motion.div>

        {/* Layout principal */}
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">

          {/* Photo docteur avec style du premier */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 group"
          >
            <div className="relative overflow-hidden image-zoom shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80"
                alt="Dr. Amine Khanboubi - meilleur-dentiste-tanger-moulay-youssef"
                className="w-full h-[500px] lg:h-[700px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />

              {/* Overlay hover */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />

              {/* Social icons */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
                  <Linkedin className="w-4 h-4" />
                </a>

                <a href="#" className="w-10 h-10 flex items-center justify-center bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              {/* Badge expérience */}
              <div className="absolute bottom-0 left-0 bg-primary text-primary-foreground p-8">
                <p className="font-serif text-5xl font-bold mb-2">10+</p>
                <p className="text-sm tracking-widest uppercase">
                  Années d'expérience
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bio docteur */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:w-1/2 flex flex-col justify-center"
          >
            <h3 className="font-serif text-2xl lg:text-4xl font-medium text-foreground mb-6">
              Chirurgien Dentiste & Expert en Esthétique
            </h3>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Passionné par la dentisterie moderne, le Dr. Amine Khanboubi met un point d'honneur à offrir des soins de haute précision.
              Il combine savoir-faire technique et approche humaine pour rassurer et soigner chaque patient.
            </p>

            {/* Compétences avec style adapté */}
            <div className="space-y-6 mb-12">

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-full">
                  <Award className="w-6 h-6" />
                </div>

                <div>
                  <h4 className="font-semibold text-foreground text-lg">
                    Excellence Clinique
                  </h4>

                  <p className="text-muted-foreground text-sm">
                    Maîtrise des protocoles internationaux en implantologie et esthétique.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-full">
                  <GraduationCap className="w-6 h-6" />
                </div>

                <div>
                  <h4 className="font-semibold text-foreground text-lg">
                    Formation Continue
                  </h4>

                  <p className="text-muted-foreground text-sm">
                    Mise à jour constante sur les dernières technologies dentaires.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-full">
                  <Stethoscope className="w-6 h-6" />
                </div>

                <div>
                  <h4 className="font-semibold text-foreground text-lg">
                    Approche Douce
                  </h4>

                  <p className="text-muted-foreground text-sm">
                    Des soins sans douleur pour un confort absolu.
                  </p>
                </div>
              </div>
            </div>

            {/* Image cabinet avec style hover */}
            <div className="relative h-48 lg:h-64 overflow-hidden image-zoom shadow-lg group">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
                alt="cabinet-dentaire-mosquee-badr-tanger equipement moderne"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />

              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

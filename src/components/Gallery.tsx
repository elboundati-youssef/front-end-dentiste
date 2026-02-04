import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Expand } from 'lucide-react';

const tabs = ['All', 'Before & After', 'Clinic', 'Team'];

const galleryItems = [
  { src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80', category: 'Clinic', span: 'col-span-2 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80', category: 'Before & After', span: '' },
  { src: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80', category: 'Team', span: '' },
  { src: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&q=80', category: 'Before & After', span: '' },
  { src: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80', category: 'Clinic', span: '' },
  { src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80', category: 'Before & After', span: 'col-span-2' },
];

export const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState('All');

  const filteredItems = activeTab === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab);

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
            Gallery
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground mb-8">
            See Our Work
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-transparent text-muted-foreground hover:text-foreground border border-border hover:border-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={`${item.src}-${index}`}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`group relative overflow-hidden cursor-pointer ${item.span}`}
            >
              <img
                src={item.src}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover aspect-square transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="w-14 h-14 flex items-center justify-center bg-primary text-primary-foreground">
                  <Expand className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

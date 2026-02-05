import { Sparkles, Droplets, Grid, Stethoscope, Heart, Zap } from "lucide-react";

export const servicesData = [
  {
    id: "esthetique-dentaire", // ID unique pour l'URL
    icon: Sparkles,
    title: "Esthétique Dentaire & Facettes",
    description: "Redessinez votre sourire avec des facettes en céramique et des soins de dentisterie esthétique pour un résultat naturel.",
    details: "Nos facettes en céramique sont fabriquées sur mesure pour s'adapter parfaitement à votre visage. Ce traitement permet de corriger la forme, la teinte et l'alignement des dents en seulement deux séances. Idéal pour masquer les imperfections et obtenir un 'Hollywood Smile' naturel et durable.",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&q=80",
  },
  {
    id: "blanchiment",
    icon: Droplets,
    title: "Blanchiment Dentaire Professionnel",
    description: "Éclaircissez vos dents avec notre technologie de blanchiment au laser haute performance.",
    details: "Le blanchiment au fauteuil offre des résultats immédiats. Nous utilisons une technologie laser qui active le gel blanchissant pour gagner jusqu'à 8 teintes en une heure, tout en protégeant vos gencives et l'émail de vos dents.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80",
  },
  {
    id: "orthodontie",
    icon: Grid,
    title: "Orthodontie & Aligneurs Invisibles",
    description: "Correction de l'alignement dentaire pour enfants et adultes via bagues ou gouttières invisibles.",
    details: "Fini les bagues métalliques disgracieuses. Nous proposons des traitements par aligneurs transparents (type Invisalign) qui sont amovibles et quasi invisibles. Nous traitons également les cas complexes avec des techniques orthodontiques modernes pour enfants et adultes.",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80",
  },
  {
    id: "implantologie",
    icon: Stethoscope,
    title: "Implantologie & Prothèses",
    description: "Pose d'implants dentaires et solutions de remplacement permanent pour retrouver une fonction masticatoire parfaite.",
    details: "L'implant dentaire est la solution la plus fiable pour remplacer une dent manquante. Notre protocole chirurgical stérile et guidé par imagerie 3D assure une précision maximale et une guérison rapide pour retrouver le confort de mastication.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
  },
  {
    id: "pediatrie",
    icon: Heart,
    title: "Dentisterie Pédiatrique (Enfants)",
    description: "Soins doux pour enfants afin de prévenir les caries et instaurer une hygiène bucco-dentaire durable.",
    details: "Nous créons un environnement ludique et rassurant pour vos enfants. Nos soins incluent le scellement des sillons, l'éducation à l'hygiène, le soin des caries et le suivi de la croissance des mâchoires pour éviter des problèmes futurs.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80",
  },
  {
    id: "urgences",
    icon: Zap,
    title: "Urgences Dentaires Tanger",
    description: "Soulagement immédiat des douleurs dentaires aiguës sur l'Avenue Moulay Youssef, près de la Mosquée Badr.",
    details: "Rage de dent ? Abcès ? Dent cassée ? Notre service d'urgence vous accueille prioritairement pour soulager la douleur immédiatement. Situé au centre de Tanger, nous sommes équipés pour gérer toutes les urgences bucco-dentaires.",
    image: "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=600&q=80",
  },
];
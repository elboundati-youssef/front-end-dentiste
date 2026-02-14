import React from 'react';
import { LegalLayout } from '../../components/LegalLayout';

const Terms = () => {
  return (
    <LegalLayout title="Conditions Générales d'Utilisation" date="14 Février 2026">
      <h3>1. Présentation du site</h3>
      <p>
        Le site a pour vocation de fournir des informations sur le Centre Dentaire Al Boughaz situé à Tanger. 
        Il ne remplace en aucun cas une consultation médicale.
      </p>

      <h3>2. Propriété intellectuelle</h3>
      <p>
        Tout le contenu du présent site (images, textes, logos, vidéos) est la propriété exclusive du 
        Dr. Amine Khanboubi, à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.
      </p>

      <h3>3. Responsabilité</h3>
      <p>
        Le Centre Dentaire Al Boughaz ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l’utilisateur 
        lors de l’accès au site. Les informations médicales fournies sont à titre indicatif.
      </p>

      <h3>4. Rendez-vous</h3>
      <p>
        La demande de rendez-vous via le site n'est pas une confirmation définitive. 
        Notre secrétariat vous contactera pour valider l'horaire.
        En cas d'empêchement, merci de nous prévenir 24h à l'avance.
      </p>
    </LegalLayout>
  );
};

export default Terms;
import React from 'react';
import { LegalLayout } from '../../components/LegalLayout';

const PrivacyPolicy = () => {
  return (
    <LegalLayout title="Politique de Confidentialité" date="14 Février 2026">
      <h3>1. Collecte de l'information</h3>
      <p>
        Le Centre Dentaire Al Boughaz recueille des informations lorsque vous utilisez notre formulaire de contact, 
        demandez un rendez-vous ou vous inscrivez à la newsletter. Les informations recueillies incluent votre nom, 
        votre adresse e-mail et votre numéro de téléphone.
      </p>

      <h3>2. Utilisation des informations</h3>
      <p>Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Vous contacter au sujet de votre demande de rendez-vous.</li>
        <li>Vous envoyer des newsletters et conseils dentaires (si inscrits).</li>
        <li>Améliorer le service client et vos besoins de prise en charge.</li>
      </ul>

      <h3>3. Confidentialité des données médicales</h3>
      <p>
        Vos données de santé sont strictement confidentielles et protégées par le secret médical. 
        Elles ne sont accessibles que par le Dr. Amine Khanboubi et son équipe médicale. 
        Aucune donnée médicale n'est vendue, échangée ou transférée à des tiers non autorisés.
      </p>

      <h3>4. Loi 09-08 et CNDP (Maroc)</h3>
      <p>
        Conformément à la loi n° 09-08 relative à la protection des personnes physiques à l'égard du traitement 
        des données à caractère personnel, vous disposez d'un droit d'accès, de rectification et d'opposition 
        aux données personnelles vous concernant. Vous pouvez exercer ce droit en nous contactant à : 
        <strong>contact@alboughaz.dental</strong>.
      </p>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
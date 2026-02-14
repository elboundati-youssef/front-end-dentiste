import React from 'react';
import { LegalLayout } from '../../components/LegalLayout';

const CookiePolicy = () => {
  return (
    <LegalLayout title="Politique des Cookies" date="14 Février 2026">
      <h3>1. Qu'est-ce qu'un cookie ?</h3>
      <p>
        Un cookie est un petit fichier texte déposé sur votre ordinateur lors de la visite d'un site. 
        Ils ont pour but de collecter des informations relatives à votre navigation.
      </p>

      <h3>2. Types de cookies utilisés</h3>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Cookies fonctionnels :</strong> Nécessaires au bon fonctionnement du site.</li>
        <li><strong>Cookies analytiques :</strong> Nous permettent de connaître l'utilisation et les performances de notre site (ex: Google Analytics).</li>
      </ul>

      <h3>3. Gestion des cookies</h3>
      <p>
        Vous pouvez à tout moment désactiver les cookies en paramétrant votre navigateur. 
        Cependant, cela pourrait empêcher l'accès à certaines fonctionnalités du site.
      </p>
    </LegalLayout>
  );
};

export default CookiePolicy;
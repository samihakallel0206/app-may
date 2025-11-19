/*import React from 'react'

const Erreur =()=>{
    return(
        <div className='App'>Erreur </div>

    )
}

export default Erreur;*/
import React from 'react';
import { Link } from 'react-router-dom';

const Erreur = () => {
  return (
    <div className="page-container">
      <div className="container text-center">
        <h1>404 - Page Non Trouvée</h1>
        <p>La page que vous recherchez n'existe pas.</p>
        <Link to="/" className="btn btn-primary">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default Erreur;
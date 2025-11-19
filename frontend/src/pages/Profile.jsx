/*import React from 'react'

const Profile =()=>{
    return(
        <div className='App'>Profile </div>

    )
}

export default Profile;*/
import React from 'react';

const Profile = ({ user }) => {
  return (
    <div className="page-container">
      <div className="container">
        <h1>Profil Utilisateur</h1>
        {user && (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Informations Personnelles</h5>
              <p><strong>Nom:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Téléphone:</strong> {user.phone}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
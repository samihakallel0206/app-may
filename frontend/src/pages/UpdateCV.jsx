import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UpdateCV = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  
  const [cvData, setCvData] = useState({
    personalInfo: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: ''
    },
    experience: [
      {
        id: 1,
        position: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ],
    education: [
      {
        id: 1,
        degree: '',
        school: '',
        year: ''
      }
    ],
    skills: []
  });

  const [currentSkill, setCurrentSkill] = useState('');

  const handlePersonalInfoChange = (field, value) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...cvData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    
    setCvData(prev => ({
      ...prev,
      experience: updatedExperience
    }));
  };

  const addExperience = () => {
    setCvData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          position: '',
          company: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ]
    }));
  };

  const removeExperience = (id) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const handleSkillAdd = () => {
    if (currentSkill.trim() && !cvData.skills.includes(currentSkill.trim())) {
      setCvData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleDownload = () => {
    // Simulation de génération de CV
    alert('Votre CV est en cours de téléchargement...');
    setTimeout(() => {
      alert('CV téléchargé avec succès !');
    }, 2000);
  };

  return (
    <div className="page">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Update CV - Gestion de Carrière</h1>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/dashboard')}
          >
            <i className="fas fa-arrow-left me-2"></i>
            Retour au Dashboard
          </button>
        </div>

        <div className="cv-builder">
          <form onSubmit={(e) => e.preventDefault()}>
            {/* Informations Personnelles */}
            <div className="form-section">
              <h4 className="text-primary">
                <i className="fas fa-user me-2"></i>
                Informations Personnelles
              </h4>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">Prénom *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={cvData.personalInfo.firstName}
                      onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">Nom *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={cvData.personalInfo.lastName}
                      onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      value={cvData.personalInfo.email}
                      onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">Téléphone *</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={cvData.personalInfo.phone}
                      onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Adresse</label>
                <input
                  type="text"
                  className="form-control"
                  value={cvData.personalInfo.address}
                  onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
                  placeholder="Adresse complète"
                />
              </div>
            </div>

            {/* Expérience Professionnelle */}
            <div className="form-section">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-primary">
                  <i className="fas fa-briefcase me-2"></i>
                  Expérience Professionnelle
                </h4>
                <button 
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={addExperience}
                >
                  <i className="fas fa-plus me-1"></i>
                  Ajouter
                </button>
              </div>

              {cvData.experience.map((exp, index) => (
                <div key={exp.id} className="experience-item border rounded p-3 mb-3">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Poste *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={exp.position}
                          onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                          placeholder="Ex: Développeur Full Stack"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Entreprise *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                          placeholder="Ex: Ooredoo Tunisia"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Date de début</label>
                        <input
                          type="month"
                          className="form-control"
                          value={exp.startDate}
                          onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Date de fin</label>
                        <input
                          type="month"
                          className="form-control"
                          value={exp.endDate}
                          onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                      placeholder="Décrivez vos responsabilités et réalisations..."
                    />
                  </div>

                  {cvData.experience.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeExperience(exp.id)}
                    >
                      <i className="fas fa-trash me-1"></i>
                      Supprimer
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Compétences */}
            <div className="form-section">
              <h4 className="text-primary">
                <i className="fas fa-cogs me-2"></i>
                Compétences
              </h4>
              
              <div className="form-group">
                <label className="form-label">Ajouter une compétence</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    placeholder="Ex: React, Node.js, MongoDB"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSkillAdd();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSkillAdd}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>

              <div className="skills-container">
                {cvData.skills.map((skill, index) => (
                  <span key={index} className="badge bg-primary me-2 mb-2 p-2">
                    {skill}
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-2"
                      onClick={() => removeSkill(skill)}
                      style={{ fontSize: '0.7rem' }}
                    ></button>
                  </span>
                ))}
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="d-flex gap-3">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleDownload}
              >
                <i className="fas fa-download me-2"></i>
                Télécharger mon CV
              </button>
              
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setCvData({
                  personalInfo: {
                    firstName: user?.firstName || '',
                    lastName: user?.lastName || '',
                    email: user?.email || '',
                    phone: user?.phone || '',
                    address: ''
                  },
                  experience: [
                    {
                      id: 1,
                      position: '',
                      company: '',
                      startDate: '',
                      endDate: '',
                      description: ''
                    }
                  ],
                  education: [
                    {
                      id: 1,
                      degree: '',
                      school: '',
                      year: ''
                    }
                  ],
                  skills: []
                })}
              >
                <i className="fas fa-redo me-2"></i>
                Réinitialiser
              </button>
            </div>
          </form>
        </div>

        {/* Aperçu du CV */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="forfait-card">
              <h4 className="text-primary">
                <i className="fas fa-eye me-2"></i>
                Aperçu de votre CV
              </h4>
              
              <div className="cv-preview border rounded p-4 bg-light">
                <div className="text-center mb-4">
                  <h2 className="text-primary">{cvData.personalInfo.firstName} {cvData.personalInfo.lastName}</h2>
                  <p className="text-muted mb-1">{cvData.personalInfo.email} | {cvData.personalInfo.phone}</p>
                  {cvData.personalInfo.address && (
                    <p className="text-muted">{cvData.personalInfo.address}</p>
                  )}
                </div>

                {cvData.experience.some(exp => exp.position) && (
                  <div className="mb-4">
                    <h5 className="border-bottom pb-2">Expérience Professionnelle</h5>
                    {cvData.experience.filter(exp => exp.position).map((exp, index) => (
                      <div key={index} className="mb-3">
                        <h6 className="mb-1">{exp.position}</h6>
                        <p className="text-muted mb-1">{exp.company}</p>
                        {exp.description && (
                          <p className="mb-0">{exp.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {cvData.skills.length > 0 && (
                  <div>
                    <h5 className="border-bottom pb-2">Compétences</h5>
                    <div className="skills-preview">
                      {cvData.skills.map((skill, index) => (
                        <span key={index} className="badge bg-secondary me-1 mb-1">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCV;
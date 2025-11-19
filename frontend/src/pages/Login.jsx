import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, clearError } from '../redux/slices/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.phone || !formData.password) {
      return;
    }

    try {
      await dispatch(login(formData)).unwrap();
      navigate('/dashboard');
    } catch (err) {
      // L'erreur est gérée par le slice
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Connexion</h2>
            <p>Accédez à votre compte VerifOoredoo</p>
          </div>
          
          <div className="auth-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Numéro de téléphone Ooredoo
                </label>
                <input
                  type="tel"
                  className={`form-control ${error ? 'error' : ''}`}
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Ex: 12345678"
                  required
                  disabled={loading}
                />
                {error && <div className="error-message">{error}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Mot de passe
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              
              <button 
                type="submit" 
                className="btn-auth" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="loading me-2"></div>
                    Connexion...
                  </>
                ) : (
                  'Se Connecter'
                )}
              </button>
            </form>
            
            <div className="text-center mt-3">
              <p className="text-muted">
                Pas encore de compte ?{' '}
                <Link to="/register" className="text-primary text-decoration-none">
                  Créer un compte
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
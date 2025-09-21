import React, { useState } from 'react';

interface LoginForm {
  email: string;
  password: string;
}

export const LoginClean: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof LoginForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (form.email === 'admin@home21.com' && form.password === 'password') {
        localStorage.setItem('auth_token', 'demo_token_123');
        localStorage.setItem('user_info', JSON.stringify({
          id: '1',
          email: form.email,
          firstName: 'Admin',
          lastName: 'Home21',
          role: 'admin'
        }));
        window.location.href = '/dashboard';
      } else {
        setError('Identifiants incorrects. Essayez admin@home21.com / password');
      }
    } catch (err) {
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: 'Inter, system-ui, sans-serif',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '20px',
        margin: '20px'
      }}>
        {/* Logo et titre */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px'
          }}>
            🏠
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#111827',
            margin: '0 0 8px 0'
          }}>
            Home21
          </h1>
          <p style={{
            color: '#6b7280',
            margin: 0,
            fontSize: '16px'
          }}>
            Plateforme de gestion de résidence étudiante
          </p>
        </div>

        {/* Carte de connexion */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '24px 24px 0 24px',
            borderBottom: '1px solid #e5e7eb',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              textAlign: 'center',
              margin: '0 0 24px 0',
              color: '#111827'
            }}>
              Connexion
            </h2>
          </div>

          {/* Contenu */}
          <div style={{ padding: '0 24px 24px 24px' }}>
            <form onSubmit={handleSubmit}>
              {/* Message d'erreur */}
              {error && (
                <div style={{
                  padding: '12px',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '6px',
                  marginBottom: '24px'
                }}>
                  <p style={{
                    fontSize: '14px',
                    color: '#dc2626',
                    margin: 0
                  }}>
                    {error}
                  </p>
                </div>
              )}

              {/* Champ email */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Adresse email
                </label>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={form.email}
                  onChange={handleInputChange('email')}
                  disabled={isLoading}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none',
                    transition: 'all 0.2s',
                    backgroundColor: isLoading ? '#f9fafb' : 'white',
                    cursor: isLoading ? 'not-allowed' : 'text'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Champ mot de passe */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Mot de passe
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleInputChange('password')}
                  disabled={isLoading}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none',
                    transition: 'all 0.2s',
                    backgroundColor: isLoading ? '#f9fafb' : 'white',
                    cursor: isLoading ? 'not-allowed' : 'text'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Bouton de connexion */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: isLoading ? '#9ca3af' : '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onMouseOver={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = '#1d4ed8';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = '#2563eb';
                  }
                }}
              >
                {isLoading ? 'Connexion en cours...' : 'Se connecter'}
              </button>
            </form>

            {/* Informations de démo */}
            <div style={{
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '1px solid #e5e7eb'
            }}>
              <div style={{
                backgroundColor: '#eff6ff',
                padding: '16px',
                borderRadius: '6px'
              }}>
                <h3 style={{
                  fontWeight: '500',
                  color: '#1e3a8a',
                  margin: '0 0 8px 0',
                  fontSize: '14px'
                }}>
                  Compte de démonstration
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#1d4ed8',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  <strong>Email :</strong> admin@home21.com<br/>
                  <strong>Mot de passe :</strong> password
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '32px'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0
          }}>
            © 2024 Home21 - Tous droits réservés
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginClean;
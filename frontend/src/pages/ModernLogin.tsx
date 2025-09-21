import React, { useState, useEffect } from 'react';
import '../styles/modern.css';

interface LoginForm {
  email: string;
  password: string;
}

const ModernLogin: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <div 
      style={{
        minHeight: '100vh',
        background: 'var(--gradient-bg)',
        position: 'relative',
        overflow: 'hidden'
      }}
      className="flex items-center justify-center p-4"
    >
      {/* Background decorations */}
      <div 
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          animation: 'float 6s ease-in-out infinite'
        }} 
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '200px',
          height: '200px',
          background: 'rgba(59, 130, 246, 0.2)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'float 4s ease-in-out infinite reverse'
        }} 
      />

      {/* Main content */}
      <div 
        className={`w-full max-w-md ${mounted ? 'animate-scale-in' : ''}`}
        style={{ maxWidth: '420px' }}
      >
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div 
            style={{
              fontSize: '4rem',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
            }}
          >
            🏠
          </div>
          <h1 
            className="text-4xl font-bold mb-2"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Home21
          </h1>
          <p 
            className="text-lg" 
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            Plateforme moderne de gestion résidentielle
          </p>
        </div>

        {/* Login Card */}
        <div 
          className={`modern-card ${mounted ? 'animate-slide-in-up' : ''}`}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          <div className="modern-card-header text-center">
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--neutral-800)' }}>
              Connexion
            </h2>
            <p className="text-sm mt-2" style={{ color: 'var(--neutral-600)' }}>
              Accédez à votre espace d'administration
            </p>
          </div>

          <div className="modern-card-content">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error message */}
              {error && (
                <div 
                  className="animate-slide-in-up"
                  style={{
                    padding: '1rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: 'var(--radius-lg)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <p style={{ color: 'var(--error-600)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
                    {error}
                  </p>
                </div>
              )}

              {/* Email field */}
              <div className="modern-input-group">
                <label className="modern-label">
                  Adresse email
                </label>
                <input
                  type="email"
                  className="modern-input"
                  placeholder="admin@home21.com"
                  value={form.email}
                  onChange={handleInputChange('email')}
                  disabled={isLoading}
                  required
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>

              {/* Password field */}
              <div className="modern-input-group">
                <label className="modern-label">
                  Mot de passe
                </label>
                <input
                  type="password"
                  className="modern-input"
                  placeholder="Votre mot de passe"
                  value={form.password}
                  onChange={handleInputChange('password')}
                  disabled={isLoading}
                  required
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="modern-btn modern-btn-primary w-full"
                style={{
                  padding: '1rem 2rem',
                  fontSize: 'var(--font-size-base)',
                  fontWeight: '600',
                  opacity: isLoading ? 0.7 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span 
                      style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}
                    />
                    Connexion en cours...
                  </span>
                ) : (
                  'Se connecter'
                )}
              </button>
            </form>

            {/* Demo credentials */}
            <div 
              style={{
                marginTop: '2rem',
                padding: '1.5rem',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: 'var(--radius-lg)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <h3 
                className="font-medium mb-3"
                style={{ 
                  color: 'var(--primary-700)',
                  fontSize: 'var(--font-size-sm)'
                }}
              >
                🚀 Compte de démonstration
              </h3>
              <div className="space-y-2 text-sm" style={{ color: 'var(--primary-600)' }}>
                <div className="flex justify-between">
                  <span className="font-medium">Email :</span>
                  <span className="font-mono">admin@home21.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Mot de passe :</span>
                  <span className="font-mono">password</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 animate-fade-in">
          <p 
            className="text-sm"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            © 2024 Home21 - Plateforme nouvelle génération
          </p>
        </div>
      </div>

    </div>
  );
};

export default ModernLogin;
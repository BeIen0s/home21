import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

interface LoginForm {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof LoginForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setError(null); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulation d'authentification
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simule une requête API
      
      // Pour la démo, on accepte admin@home21.com / password
      if (form.email === 'admin@home21.com' && form.password === 'password') {
        localStorage.setItem('auth_token', 'demo_token_123');
        localStorage.setItem('user_info', JSON.stringify({
          id: '1',
          email: form.email,
          firstName: 'Admin',
          lastName: 'Home21',
          role: 'admin'
        }));
        window.location.href = '/dashboard'; // Redirect to dashboard
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
      className="min-h-screen" 
      style={{
        background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div style={{ width: '100%', maxWidth: '28rem' }}>
        {/* Logo et titre */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏠</div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem', margin: 0 }}>
            Home21
          </h1>
          <p style={{ color: '#6b7280', margin: 0 }}>
            Plateforme de gestion de résidence étudiante
          </p>
        </div>

        {/* Formulaire de connexion */}
        <Card>
          <CardHeader>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', textAlign: 'center', margin: 0 }}>
              Connexion
            </h2>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {error && (
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '0.375rem'
                }}>
                  <p style={{ fontSize: '0.875rem', color: '#dc2626', margin: 0 }}>{error}</p>
                </div>
              )}

              <div>
                <Input
                  type="email"
                  label="Adresse email"
                  placeholder="votre@email.com"
                  value={form.email}
                  onChange={handleInputChange('email')}
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <Input
                  type="password"
                  label="Mot de passe"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleInputChange('password')}
                  disabled={isLoading}
                  required
                />
              </div>

              <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
                className="w-full"
                style={{ width: '100%' }}
              >
                {isLoading ? 'Connexion en cours...' : 'Se connecter'}
              </Button>
            </form>

            <div style={{
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #e5e7eb'
            }}>
              <div style={{
                backgroundColor: '#eff6ff',
                padding: '1rem',
                borderRadius: '0.375rem'
              }}>
                <h3 style={{
                  fontWeight: '500',
                  color: '#1e3a8a',
                  marginBottom: '0.5rem',
                  margin: '0 0 0.5rem 0'
                }}>
                  Compte de démonstration
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#1d4ed8',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  <strong>Email :</strong> admin@home21.com<br/>
                  <strong>Mot de passe :</strong> password
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{
            fontSize: '0.875rem',
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

export default Login;
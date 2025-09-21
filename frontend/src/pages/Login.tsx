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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🏠</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Home21</h1>
          <p className="text-gray-600">Plateforme de gestion de résidence étudiante</p>
        </div>

        {/* Formulaire de connexion */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-center">Connexion</h2>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Input
                type="email"
                label="Adresse email"
                placeholder="votre@email.com"
                value={form.email}
                onChange={handleInputChange('email')}
                disabled={isLoading}
                required
              />

              <Input
                type="password"
                label="Mot de passe"
                placeholder="••••••••"
                value={form.password}
                onChange={handleInputChange('password')}
                disabled={isLoading}
                required
              />

              <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Connexion en cours...' : 'Se connecter'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-medium text-blue-900 mb-2">Compte de démonstration</h3>
                <p className="text-sm text-blue-700">
                  <strong>Email :</strong> admin@home21.com<br/>
                  <strong>Mot de passe :</strong> password
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2024 Home21 - Tous droits réservés
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
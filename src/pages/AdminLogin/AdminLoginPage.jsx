import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { FiLock, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function AdminLoginPage() {
    const navigate = useNavigate();
    const { login, error, authenticated } = useAuth();
    const { company } = useApp();
    const [pin, setPin] = useState('');

    useEffect(() => {
        if (authenticated) {
            navigate({ to: '/dashboard' });
        }
    }, [authenticated, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (login(pin)) {
            window.location.assign('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.02),_transparent_55%)] bg-background px-4 py-10">
            <div className="mx-auto flex max-w-md flex-col rounded-[32px] border border-border bg-card p-6 shadow-[0_25px_80px_-24px_rgba(0,0,0,0.18)] sm:p-8">
                <div className="flex items-center justify-center rounded-2xl bg-primary-soft p-4 text-primary">
                    {company?.logo ? <img src={company.logo} alt={company.name} className="h-16 w-16 rounded-2xl object-contain" /> : <FiLock size={28} />}
                </div>
                <div className="mt-6 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Painel Administrativo</p>
                    <h1 className="mt-2 text-3xl font-extrabold text-foreground">{company?.name || 'Marmitaria'}</h1>
                    <p className="mt-2 text-sm text-muted-foreground">Acesse o painel com o PIN de 4 dígitos.</p>
                </div>

                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    <Input
                        id="admin-pin"
                        label="PIN de 4 dígitos"
                        type="password"
                        inputMode="numeric"
                        maxLength={4}
                        value={pin}
                        onChange={(event) => setPin(event.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="1234"
                    />
                    {error ? <p className="text-sm font-medium text-destructive">{error}</p> : null}
                    <Button type="submit" fullWidth size="lg">
                        Entrar <FiArrowRight />
                    </Button>
                </form>

                <p className="mt-6 text-center text-xs text-muted-foreground">Para uso interno da marmitaria.</p>
            </div>
        </div>
    );
}

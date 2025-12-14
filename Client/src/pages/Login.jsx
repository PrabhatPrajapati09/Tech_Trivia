import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import toast from 'react-hot-toast';
import { LogIn, User, Shield, Key } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'user',
        adminKey: ''
    });

    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;
    // If CRA, use:
    // const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🔒 ADMIN KEY CHECK (FRONTEND GATE)
        if (formData.role === 'admin') {
            if (!formData.adminKey) {
                toast.error("Admin key is required");
                return;
            }

            if (formData.adminKey !== ADMIN_KEY) {
                toast.error("Invalid admin key");
                console.log(ADMIN_KEY);
                return;
            }
        }

        setLoading(true);
        const result = await login(
            formData.email,
            formData.password,
            formData.role
        );
        setLoading(false);

        if (result.success) {
            toast.success('Welcome back!');
            navigate(formData.role === 'admin' ? '/admin' : '/dashboard');
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
            <Card className="w-full max-w-md animate-scale-in">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-4 shadow-glow">
                        <LogIn className="text-white" size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-gradient-primary mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-text-muted">
                        Enter your credentials to continue
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Role Selector */}
                    <div className="flex gap-3 p-1 bg-surface/50 rounded-xl backdrop-blur-sm">
                        <button
                            type="button"
                            onClick={() =>
                                setFormData({ ...formData, role: 'user', adminKey: '' })
                            }
                            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                                formData.role === 'user'
                                    ? 'bg-gradient-to-r from-primary to-primary-dark text-white'
                                    : 'text-text-muted'
                            }`}
                        >
                            <User size={18} />
                            User
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setFormData({ ...formData, role: 'admin' })
                            }
                            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                                formData.role === 'admin'
                                    ? 'bg-gradient-to-r from-secondary to-secondary-dark text-white'
                                    : 'text-text-muted'
                            }`}
                        >
                            <Shield size={18} />
                            Admin
                        </button>
                    </div>

                    <Input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        required
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                        required
                    />

                    {/* 🔑 ADMIN KEY FIELD (ONLY FOR ADMIN) */}
                    {formData.role === 'admin' && (
                        <Input
                            type="password"
                            placeholder="Admin Key"
                            value={formData.adminKey}
                            onChange={(e) =>
                                setFormData({ ...formData, adminKey: e.target.value })
                            }
                            required
                            icon={<Key size={18} />}
                        />
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                        className="w-full py-4 text-lg"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>

                    <p className="text-center text-text-muted">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            className="text-primary font-semibold"
                        >
                            Sign Up
                        </Link>
                    </p>
                </form>
            </Card>
        </div>
    );
};

export default Login;

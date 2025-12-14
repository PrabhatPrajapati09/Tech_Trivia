import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import toast from 'react-hot-toast';
import { UserPlus, User, Shield } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await signup(formData.username, formData.email, formData.password, formData.role);
        setLoading(false);

        if (result.success) {
            toast.success('Account created! Please login.');
            navigate('/login');
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
            <Card className="w-full max-w-md animate-scale-in">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl mb-4 shadow-glow-pink">
                        <UserPlus className="text-white" size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-gradient-secondary mb-2">Create Account</h2>
                    <p className="text-text-muted">Join us and start your learning journey</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Role Selector */}
                    <div className="flex gap-3 p-1 bg-surface/50 rounded-xl backdrop-blur-sm">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, role: 'user' })}
                            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${formData.role === 'user'
                                ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/30'
                                : 'text-text-muted hover:text-text'
                                }`}
                        >
                            <User size={18} />
                            User
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, role: 'admin' })}
                            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${formData.role === 'admin'
                                ? 'bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-lg shadow-secondary/30'
                                : 'text-text-muted hover:text-text'
                                }`}
                        >
                            <Shield size={18} />
                            Admin
                        </button>
                    </div>

                    <Input
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        required
                    />

                    <Input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />

                    <Button
                        type="submit"
                        variant="secondary"
                        disabled={loading}
                        className="w-full py-4 text-lg"
                    >
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </Button>

                    <p className="text-center text-text-muted">
                        Already have an account?{' '}
                        <Link to="/login" className="text-secondary hover:text-secondary-light font-semibold transition-colors">
                            Login
                        </Link>
                    </p>
                </form>
            </Card>
        </div>
    );
};

export default Signup;

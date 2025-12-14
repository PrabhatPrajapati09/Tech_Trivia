import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import { LogOut, User, Shield, Sparkles, History, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="border-b border-white/10 bg-background/60 backdrop-blur-2xl sticky top-0 z-50 shadow-elegant">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
                <Link to="/" className="text-2xl font-bold flex items-center gap-2 group">
                    <Sparkles className="text-primary group-hover:rotate-12 transition-transform duration-300" size={24} />
                    <span className="text-gradient-primary">Tech</span>
                    <span className="text-text">Trivia</span>
                </Link>

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <Link to={user.role === 'admin' ? '/admin' : '/dashboard'}>
                                <Button variant="ghost" className="hidden md:flex">
                                    <LayoutDashboard size={18} />
                                    Dashboard
                                </Button>
                            </Link>
                            {user.role === 'user' && (
                                <Link to="/history">
                                    <Button variant="ghost" className="hidden md:flex">
                                        <History size={18} />
                                        History
                                    </Button>
                                </Link>
                            )}
                            <span className="flex items-center gap-2 text-text-muted px-4 py-2 rounded-lg bg-surface/30 backdrop-blur-sm">
                                {user.role === 'admin' ? (
                                    <Shield size={18} className="text-primary" />
                                ) : (
                                    <User size={18} className="text-secondary" />
                                )}
                                <span className="font-medium">{user.username || user.email}</span>
                            </span>
                            <Button variant="ghost" onClick={handleLogout} className="p-2 hover:rotate-12">
                                <LogOut size={20} />
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="ghost">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button variant="primary">Sign Up</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

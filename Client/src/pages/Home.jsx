import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { Brain, Trophy, Users, Sparkles, Zap, Target } from 'lucide-react';
import { AuthContext } from '../context/AuthContext.jsx';

const Home = () => {
    const { user, userData } = useContext(AuthContext);

    return (
        <div className="container mx-auto px-4 py-16 animate-fade-in max-w-7xl">
            {/* Hero Section */}
            <div className="text-center mb-20 relative">
                <div className="absolute inset-0 -z-10 opacity-30">
                    <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute top-40 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="inline-block mb-6 px-6 py-2 bg-primary/10 border border-primary/30 rounded-full backdrop-blur-sm">
                    <span className="text-primary font-semibold flex items-center gap-2">
                        <Sparkles size={16} className="animate-pulse" />
                        Welcome to the Future of Learning
                    </span>
                </div>

                <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
                    <span className="text-gradient-primary">Master Your</span>
                    <br />
                    <span className="text-text">Knowledge</span>
                </h1>

                <p className="text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
                    Challenge yourself with our diverse collection of quizzes. Learn, compete, and track your progress in an elegant, modern environment.
                </p>

                {!user ? (
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link to="/signup">
                            <Button variant="primary" className="px-8 py-4 text-lg group">
                                Get Started
                                <Zap size={20} className="group-hover:rotate-12 transition-transform" />
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="outline" className="px-8 py-4 text-lg">
                                Login
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <p className='text-4xl font-extrabold'>👋Hello {" "}
                            <span className='text-gradient-primary'>
                                {user.username}
                            </span>
                        </p>
                    </div>
                )}

            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <FeatureCard
                    icon={<Brain className="text-primary" size={40} />}
                    title="Learn & Grow"
                    description="Expand your knowledge across various topics with our carefully curated quizzes."
                    gradient="from-primary/20 to-primary/5"
                />
                <FeatureCard
                    icon={<Trophy className="text-secondary" size={40} />}
                    title="Track Progress"
                    description="Monitor your scores and see how you improve over time with detailed analytics."
                    gradient="from-secondary/20 to-secondary/5"
                />
                <FeatureCard
                    icon={<Users className="text-success" size={40} />}
                    title="Compete & Win"
                    description="Join a community of learners and showcase your expertise on leaderboards."
                    gradient="from-green-500/20 to-green-500/5"
                />
            </div>

            {/* Stats Section
            <div className="glass-strong p-12 rounded-3xl text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard number="1000+" label="Active Users" />
                    <StatCard number="500+" label="Quizzes" />
                    <StatCard number="10K+" label="Questions Answered" />
                </div>
            </div> */}
        </div>
    );
};

const FeatureCard = ({ icon, title, description, gradient }) => (
    <div className={`glass-strong p-8 flex flex-col items-center text-center gap-4 group hover:scale-105 transition-all duration-300 bg-gradient-to-br ${gradient}`}>
        <div className="p-4 bg-white/5 rounded-2xl group-hover:rotate-6 transition-transform duration-300 group-hover:shadow-glow">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-text">{title}</h3>
        <p className="text-text-muted leading-relaxed">{description}</p>
    </div>
);

// const StatCard = ({ number, label }) => (
//     <div className="group">
//         <div className="text-5xl font-extrabold text-gradient-primary mb-2 group-hover:scale-110 transition-transform">
//             {number}
//         </div>
//         <div className="text-text-muted font-medium">{label}</div>
//     </div>
// );

export default Home;

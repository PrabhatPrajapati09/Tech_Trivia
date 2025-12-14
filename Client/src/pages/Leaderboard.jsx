import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { quizAPI } from '../utils/apiService';
import Card from '../components/Card';
import Button from '../components/Button';
import { Trophy, Medal, Award, ArrowLeft, Users, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const Leaderboard = () => {
    const { id } = useParams();
    const [leaderboardData, setLeaderboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaderboard();
    }, [id]);

    const fetchLeaderboard = async () => {
        try {
            const data = await quizAPI.getLeaderboard(id, 10);
            setLeaderboardData(data);
        } catch (error) {
            console.error("Failed to fetch leaderboard", error);
            toast.error("Failed to load leaderboard");
        } finally {
            setLoading(false);
        }
    };

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1:
                return <Trophy size={28} className="text-yellow-400" />;
            case 2:
                return <Medal size={28} className="text-gray-300" />;
            case 3:
                return <Award size={28} className="text-amber-600" />;
            default:
                return <span className="text-2xl font-bold text-text-muted">#{rank}</span>;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full animate-pulse mb-4 mx-auto"></div>
                    <p className="text-text-muted">Loading leaderboard...</p>
                </div>
            </div>
        );
    }

    if (!leaderboardData) {
        return <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center text-text-muted">Leaderboard not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl animate-fade-in">
            {/* Back Button */}
            <div className="mb-8">
                <Link to="/admin">
                    <Button variant="ghost">
                        <ArrowLeft size={20} />
                        Back
                    </Button>
                </Link>
            </div>

            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full mb-6 shadow-glow-lg">
                    <Trophy className="text-white" size={40} />
                </div>
                <h1 className="text-5xl font-extrabold mb-3">
                    <span className="text-gradient-primary">Leaderboard</span>
                </h1>
                <h2 className="text-2xl text-text mb-4">{leaderboardData.quizTitle}</h2>
                <div className="flex items-center justify-center gap-6 text-text-muted">
                    <div className="flex items-center gap-2">
                        <Users size={18} />
                        <span>{leaderboardData.totalAttempts} Attempts</span>
                    </div>
                </div>
            </div>

            {/* Leaderboard List */}
            {leaderboardData.leaderboard.length === 0 ? (
                <Card className="text-center p-12">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Trophy className="text-primary" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">No attempts yet</h3>
                    <p className="text-text-muted">Be the first to take this quiz!</p>
                </Card>
            ) : (
                <div className="space-y-4">
                    {leaderboardData.leaderboard.map((entry, index) => (
                        <Card
                            key={index}
                            className={`group transition-all duration-300 ${index < 3
                                    ? 'bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-2 border-primary/50 shadow-glow'
                                    : ''
                                }`}
                        >
                            <div className="flex items-center justify-between gap-6">
                                {/* Rank & User Info */}
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="w-12 flex justify-center">
                                        {getRankIcon(index + 1)}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-text mb-1 group-hover:text-gradient-primary transition-all">
                                            {entry.username}
                                        </h3>
                                        <p className="text-text-muted text-sm flex items-center gap-2">
                                            <Calendar size={14} />
                                            {formatDate(entry.completedAt)}
                                        </p>
                                    </div>
                                </div>

                                {/* Score */}
                                <div className="text-right">
                                    <div className="text-3xl font-extrabold text-gradient-primary">
                                        {entry.score}<span className="text-lg text-text-muted">/{entry.totalQuestions}</span>
                                    </div>
                                    <div className="text-text-muted font-semibold">
                                        {entry.percentage}%
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Leaderboard;

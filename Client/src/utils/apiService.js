import api from './api';

// ============================================
// AUTHENTICATION API SERVICES
// ============================================

/**
 * Admin Authentication Services
 */
export const adminAuthAPI = {
    /**
     * Admin signup
     * @param {string} username - Admin username
     * @param {string} email - Admin email
     * @param {string} password - Admin password
     * @returns {Promise} Response with message, id, and email
     */
    signup: async (username, email, password) => {
        const response = await api.post('/v1/admin/signup', { username, email, password });
        return response.data;
    },

    /**
     * Admin login
     * @param {string} email - Admin email
     * @param {string} password - Admin password
     * @returns {Promise} Response with token and message
     */
    login: async (email, password) => {
        const response = await api.post('/v1/admin/login', { email, password });
        return response.data;
    }
};

/**
 * User Authentication Services
 */
export const userAuthAPI = {
    /**
     * User signup
     * @param {string} username - User username
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise} Response with message, id, and email
     */
    signup: async (username, email, password) => {
        const response = await api.post('/v1/user/signup', { username, email, password });
        return response.data;
    },

    /**
     * User login
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise} Response with token, message, and user object
     */
    login: async (email, password) => {
        const response = await api.post('/v1/user/login', { email, password });
        return response.data;
    }
};

// ============================================
// QUIZ API SERVICES
// ============================================

/**
 * Quiz Services
 */
export const quizAPI = {
    /**
     * Get all quizzes (public)
     * @returns {Promise} Array of all quizzes
     */
    getAll: async () => {
        const response = await api.get('/quiz');
        return response.data;
    },

    /**
     * Get single quiz by ID (public)
     * @param {string} id - Quiz ID
     * @returns {Promise} Quiz object
     */
    getById: async (id) => {
        const response = await api.get(`/quiz/${id}`);
        return response.data;
    },

    /**
     * Create new quiz (admin only)
     * @param {Object} quizData - Quiz data with title and questions
     * @returns {Promise} Response with message and created quiz
     */
    create: async (quizData) => {
        const response = await api.post('/quiz', quizData);
        return response.data;
    },

    /**
     * Update existing quiz (admin only)
     * @param {string} id - Quiz ID
     * @param {Object} quizData - Updated quiz data
     * @returns {Promise} Response with message and updated quiz
     */
    update: async (id, quizData) => {
        const response = await api.put(`/quiz/${id}`, quizData);
        return response.data;
    },

    /**
     * Delete quiz (admin only)
     * @param {string} id - Quiz ID
     * @returns {Promise} Response with message
     */
    delete: async (id) => {
        const response = await api.delete(`/quiz/${id}`);
        return response.data;
    },

    /**
     * Submit quiz result (authenticated users)
     * @param {string} id - Quiz ID
     * @param {Object} resultData - Result data with score and totalQuestions
     * @returns {Promise} Response with message and result
     */
    submitResult: async (id, resultData) => {
        const response = await api.post(`/quiz/${id}/submit`, resultData);
        return response.data;
    },

    /**
     * Get quiz leaderboard (public)
     * @param {string} id - Quiz ID
     * @param {number} limit - Number of top scorers to retrieve (default: 10)
     * @returns {Promise} Leaderboard data
     */
    getLeaderboard: async (id, limit = 10) => {
        const response = await api.get(`/quiz/${id}/leaderboard?limit=${limit}`);
        return response.data;
    },

    /**
     * Get user's quiz history (authenticated users)
     * @returns {Promise} User's quiz history with statistics
     */
    getUserHistory: async () => {
        const response = await api.get('/quiz/user/history');
        return response.data;
    }
};

// ============================================
// COMBINED AUTH API (for convenience)
// ============================================

/**
 * Combined authentication API
 * Provides unified interface for both admin and user auth
 */
export const authAPI = {
    /**
     * Login based on role
     * @param {string} email - Email
     * @param {string} password - Password
     * @param {string} role - 'admin' or 'user'
     * @returns {Promise} Response with token and user data
     */
    login: async (email, password, role) => {
        if (role === 'admin') {
            return adminAuthAPI.login(email, password);
        } else {
            return userAuthAPI.login(email, password);
        }
    },

    /**
     * Signup based on role
     * @param {string} username - Username (required for both admin and user)
     * @param {string} email - Email
     * @param {string} password - Password
     * @param {string} role - 'admin' or 'user'
     * @returns {Promise} Response with message and user data
     */
    signup: async (username, email, password, role) => {
        if (role === 'admin') {
            return adminAuthAPI.signup(username, email, password);
        } else {
            return userAuthAPI.signup(username, email, password);
        }
    }
};

export default {
    auth: authAPI,
    adminAuth: adminAuthAPI,
    userAuth: userAuthAPI,
    quiz: quizAPI
};

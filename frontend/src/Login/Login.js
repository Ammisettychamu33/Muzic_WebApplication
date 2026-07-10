import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const API_URL = 'http://localhost:5000';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const emailRef = useRef(null);

    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    const closeModal = () => {
        setIsModalOpen(false);
        setError('');
    };

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleEscape);

        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        setError('');

        // Empty field validation
        if (!trimmedEmail || !trimmedPassword) {
            setError('Please fill in all fields.');
            setIsModalOpen(true);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(trimmedEmail)) {
            setError('Please enter a valid email address.');
            setIsModalOpen(true);
            return;
        }

        // Password validation
        if (trimmedPassword.length < 6) {
            setError('Password must be at least 6 characters.');
            setIsModalOpen(true);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: trimmedEmail,
                    password: trimmedPassword,
                }),
            });

            let data = {};

            try {
                data = await response.json();
            } catch {
                data = {};
            }

            if (response.ok) {
                // Save login information
                localStorage.setItem('token', data.token);

                if (data.user) {
                    localStorage.setItem(
                        'user',
                        JSON.stringify(data.user)
                    );
                }

                if (onLogin) {
                    onLogin(data.token, data.user);
                }

                setEmail('');
                setPassword('');

                navigate('/albums');
            } else {
                setError(data.message || 'Invalid email or password.');
                setIsModalOpen(true);
            }
        } catch (err) {
            console.error('Login Error:', err);

            if (!navigator.onLine) {
                setError('No internet connection.');
            } else {
                setError(
                    'Unable to connect to the server. Please make sure the backend is running.'
                );
            }

            setIsModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/registration');
    };

    return (
        <div className="login-container">
            <div className="form-container">
                <h1>Login to Music Vibes</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <button
                    className="register-button"
                    onClick={handleRegisterRedirect}
                    disabled={loading}
                >
                    Don't have an account? Register Here
                </button>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>{error}</p>

                        <button onClick={closeModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
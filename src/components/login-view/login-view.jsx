import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }

        try {
            const response = await fetch('https://moviesflix-hub-fca46ebf9888.herokuapp.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const { token } = data;

            // Store user and token in local storage
            localStorage.setItem('user', JSON.stringify({ username }));
            localStorage.setItem('token', token);

            // Notify parent component about successful login
            onLoggedIn({ username }, token);
        } catch (error) {
            setError('Login failed. Please try again.');
            console.error('Login error:', error);
        }
    };

    return (
        <Form className="login-form" onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <Form.Label className="form-label">Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control"
                    required
                />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label className="form-label">Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    required
                />
            </Form.Group>

            {error && <div className="error-message">{error}</div>}

            <Button variant="primary" type="submit" className="login-button">
                Login
            </Button>
        </Form>
    );
};

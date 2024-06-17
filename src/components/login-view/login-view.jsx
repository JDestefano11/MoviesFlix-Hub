
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './login.scss';

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Form validation
        if (!username || !password) {
            alert('Please enter both username and password.');
            return;
        }

        const user = {
            username: username,
            password: password
        };
        const token = 'dummyToken';

        // Store user data and token in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        onLoggedIn(user, token);
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

            <Button variant="primary" type="submit" className="login-button">
                Login
            </Button>
        </Form>
    );
};

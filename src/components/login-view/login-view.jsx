import React, { useState } from 'react';

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
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Login</button>
        </form>
    );
};
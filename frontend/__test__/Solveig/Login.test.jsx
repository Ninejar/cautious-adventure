import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from "../../src/context/AuthContext";
import Login from '../../src/components/Login/Login';
import axios from 'axios';

// Mock axios and AuthContext for controlled testing environment
vi.mock('axios');
vi.mock('../../src/context/AuthContext', () => ({
    useAuth: () => ({ login: vi.fn() }),
    AuthProvider: ({ children }) => <div>{children}</div>
}));

describe('Login component - Verification of Expected Behavior - solveig', () => {
    beforeEach(() => {
        vi.resetAllMocks(); // Reset mocks to clean state before each test
        // dummy JWT for testing
        const dummyToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidGVhY2hlciIsImlhdCI6MTUxNjIzOTAyMn0.invalidsignature";
        axios.post.mockResolvedValue({ data: { token: dummyToken } });
    });

    afterEach(cleanup); // Clean up DOM after each test to prevent leakage

    it('renders only one login button - solveig', () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <Login />
                </AuthProvider>
            </MemoryRouter>
        );
        const loginButtons = screen.getAllByTestId('login-button');
        expect(loginButtons.length).toBe(1);
    });

    it('sends correct data when login button is clicked with valid input - solveig', async () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <Login />
                </AuthProvider>
            </MemoryRouter>
        );

        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByTestId('login-button');
        
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:1814/users/login', {
                email: 'test@example.com',
                password: 'password123',
            });
        });
    });
    it('renders without crashing - solveig', () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <Login />
                </AuthProvider>
            </MemoryRouter>
        );
         // Implicit test, successful render without errors
    });

    it('renders with custom props - solveig', () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <Login customProp="customValue" />
                </AuthProvider>
            </MemoryRouter>
        );
        // add props to check behaviors or effects of custom props
    });

    it('performs action on button click - solveig', () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <Login />
                </AuthProvider>
            </MemoryRouter>
        );
        const button = screen.getByTestId('login-button');
        fireEvent.click(button); // Simulate button click and check resulting action
    });

    it('handles realistic usage cases - solveig', async () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <Login />
                </AuthProvider>
            </MemoryRouter>
        );

        // Test with valid email and password
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'user@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByTestId('login-button'));
        await waitFor(() => {
        });

        // Add more tests with different email and password combinations
        const emailAndPasswordCombinations = [
            { email: 'john@example.com', password: 'password123' },
            { email: 'jane@example.com', password: 'test@123' },
            { email: 'alice@example.com', password: 'al1c3P@ss!' },
            { email: 'bob@example.com', password: 'BoBPaSsW0rd!' },
        ];

        emailAndPasswordCombinations.forEach(({ email, password }) => {
            fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: email } });
            fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: password } });
            fireEvent.click(screen.getByTestId('login-button'));
        });
    });

    it('handles boundary cases - solveig', async () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <Login />
                </AuthProvider>
            </MemoryRouter>
        );

        // Test with minimum and maximum password length
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'user@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'a' } }); // Minimum length
        fireEvent.click(screen.getByTestId('login-button'));

        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '12345678901234567890123456789012345678901234567890' } }); // Maximum length
        fireEvent.click(screen.getByTestId('login-button'));
    });

    it('handles edge case - solveig', async () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <Login />
                </AuthProvider>
            </MemoryRouter>
        );

        // Test with empty email and password
        fireEvent.click(screen.getByTestId('login-button'));

        // Test with extremely long email and password inputs
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'a'.repeat(256) } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'a'.repeat(256) } });
        fireEvent.click(screen.getByTestId('login-button'));
    });

    it('handles negative cases - solveig', async () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <Login />
                </AuthProvider>
            </MemoryRouter>
        );

        // Test with invalid email formats
        const invalidEmails = ['user', 'user@', '@example.com'];
        invalidEmails.forEach(email => {
            fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: email } });
            fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
            fireEvent.click(screen.getByTestId('login-button'));
        });

        // Test with null or undefined email or password input
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: null } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: undefined } });
        fireEvent.click(screen.getByTestId('login-button'));

        // Test with SQL/NoSQL injection attempts
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: "'; DROP TABLE Users; --" } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: "'; DROP TABLE Users; --" } });
        fireEvent.click(screen.getByTestId('login-button'));
    });
});
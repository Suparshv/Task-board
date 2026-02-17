// import { render, screen, fireEvent } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from '../context/AuthContext';
// import Login from '../components/Login';

// // Helper to wrap components with required context providers
// const renderWithProviders = (ui) => {
//     return render(
//         <BrowserRouter>
//             <AuthProvider>{ui}</AuthProvider>
//         </BrowserRouter>
//     );
// };

// test('renders login page correctly', () => {
//     renderWithProviders(<Login />);
//     expect(screen.getByText(/Task Board Login/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
// });

// test('shows error on invalid credentials', () => {
//     renderWithProviders(<Login />);

//     fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'wrong@test.com' } });
//     fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'wrong' } });
//     fireEvent.click(screen.getByText(/Login/i));

//     expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
// });

// test('allows form input interaction', () => {
//     renderWithProviders(<Login />);
//     const emailInput = screen.getByPlaceholderText(/Email/i);
//     fireEvent.change(emailInput, { target: { value: 'intern@demo.com' } });
//     expect(emailInput.value).toBe('intern@demo.com');
// });
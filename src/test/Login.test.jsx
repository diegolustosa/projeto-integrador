import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../Components/Login'; 

    test('Login com email ou username', async () => {
        render(<Login />);
    
        // Preenche o formulário com email ou username e senha
        fireEvent.change(screen.getByLabelText(/usuário ou email/i), { target: { value: 'exemplo@gmail.com' } }); // ou 'usuario123' para username
        fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'senha123' } });
    
        // Submete o formulário
        fireEvent.click(screen.getByText(/entrar/i));
    
        // Verifica se o login foi bem-sucedido
        await waitFor(() => expect(window.location.pathname).toBe('/dashboard'));
    });
    
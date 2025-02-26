import { render, screen, fireEvent } from '@testing-library/react';
import Cadastrar from '../Components/Cadastrar';

test('As senhas são iguais', () => {
    // Mock do alert para verificar se ele foi chamado
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<Cadastrar />);

    // Seleciona os campos de senha e confirmar senha
    const passwordInput = screen.getByLabelText('Senha');
    const confirmPasswordInput = screen.getByLabelText('Confirmar Senha');
    const button = screen.getByText('Cadastrar');

    // Simula o preenchimento dos campos
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '123456' } });

    // Simula o envio do formulário
    fireEvent.click(button);

    // Verifica se a lógica de senhas iguais foi chamada corretamente
    expect(window.alert).toHaveBeenCalledWith('Senhas iguais');
});

test('As senhas são diferentes', () => {
    // Mock do alert para verificar se ele foi chamado
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<Cadastrar />);

    
    const passwordInput = screen.getByLabelText('Senha');
    const confirmPasswordInput = screen.getByLabelText('Confirmar Senha');
    const button = screen.getByText('Cadastrar');


    fireEvent.change(passwordInput, { target: { value: 'senha123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'senha456' } });

    
    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith('Senhas diferentes');
});


test('Formato de email correto', () => {
    render(<Cadastrar />);

    const emailInput = screen.getByLabelText('E-mail');
    fireEvent.change(emailInput, { target: { value: 'exemplo@gmail.com' } });

    expect(emailInput.value).toBe('exemplo@gmail.com');
});

import React from 'react';
import {
  fireEvent,
  getByLabelText,
  getByTestId,
  getByText,
  render,
  screen,
} from '@testing-library/react';
import App, { calcularNovoSaldo } from '../App';

describe('Componente principal', () => {
  //teste para verificar se os componenentes estão renderizados
  describe('Quando eu abro o app do banco,', () => {
    it('o nome é exibido', () => {
      //render - renderiza nosso componente
      render(<App />);

      //screen - acessa nosso componente
      expect(screen.getByText('ByteBank')).toBeInTheDocument();
    });

    it('o saldo é exibido', () => {
      render(<App />);
      expect(screen.getByText('Saldo:')).toBeInTheDocument();
    });

    it('o botão de transação é exibido', () => {
      render(<App />);
      expect(screen.getByText('Realizar operação')).toBeInTheDocument();
    });
  });

  //teste para verificar as funcionalidades
  describe('Quando eu realizo uma transação', () => {
    it('que é um saque, o valor vai diminuir', () => {
      const saldo = 150;
      const valores = {
        transacao: 'saque',
        valor: 50,
      };
      const novoSaldo = calcularNovoSaldo(valores, saldo);
      expect(novoSaldo).toBe(100);
    });

    it('que é um depósito, o valor vai aumentar', () => {
      const saldo = 100;
      const valores = {
        transacao: 'deposito',
        valor: 50,
      };
      const novoSaldo = calcularNovoSaldo(valores, saldo);
      expect(novoSaldo).toBe(150);
    });

    // it('que é um saque, a transação deve ser realizada', () => {
    //   const { getByText, getByTestId, getByLabelText } = render(<App />);
    //   const saldo = getByText('R$ 1000');
    //   const transacao = getByLabelText('Saque');
    //   const valor = getByTestId('valor');
    //   const botaoTransacao = getByText('Realizar operação');

    //   expect(saldo.textContent).toBe('R$ 1000');

    //   //simular eventos do usuário a partir da visão do usuario
    //   // React Testing Library simula um comportamento muito próximo
    //   // do que o usuário está fazendo, então o foco dele é em como
    //   // o usuário interage com a aplicação.
    //   fireEvent.click(transacao, { target: { value: 'saque' } });
    //   fireEvent.change(valor, { target: { value: 10 } });
    //   fireEvent.click(botaoTransacao);
    //   expect(saldo.textContent).toBe('R$ 990');
    // });

    it('que é um depósito, a transação deve ser realizada', () => {
      render(<App />);
      const saldo = screen.getByText('R$ 1000');
      const transacao = screen.getByLabelText('Depósito');
      const valor = screen.getByTestId('valor');
      const botaoTransacao = screen.getByText('Realizar operação');

      expect(saldo.textContent).toBe('R$ 1000');

      // simular eventos do usuário a partir da visão do usuario
      // React Testing Library simula um comportamento muito próximo
      // do que o usuário está fazendo, então o foco dele é em como
      // o usuário interage com a aplicação.
      fireEvent.click(transacao, { target: { value: 'deposito' } });
      fireEvent.change(valor, { target: { value: 10 } });
      fireEvent.click(botaoTransacao);
      expect(saldo.textContent).toBe('R$ 1010');
    });
  });
});

import api from '../api';
import React from 'react';
import App from '../App';
import { fireEvent, render, screen } from '@testing-library/react';
import Conta from '../conta/Conta';

//é necessário mocar e simular a nossa api usando:
jest.mock('../api');

describe('Requisições para a api', () => {
  it('Exibir lista de transações através da API', async () => {
    api.listaTransacoes.mockResolvedValue([
      {
        valor: '10',
        transacao: 'saque',
        data: '10/08/2020',
        id: 1,
      },
      {
        valor: '20',
        transacao: 'deposito',
        data: '26/09/2020',
        id: 2,
      },
    ]);

    render(<App />);

    //para buscar queries
    expect(await screen.findByText('saque')).toBeInTheDocument;

    expect(screen.getByTestId('transacoes').children.length).toBe(2);
  });

  it('Chama a função de realizar transação, quando o botão é clicado', () => {
    //mock para simular função e validar se ela foi chamada
    const funcaoRealizarTransacao = jest.fn();

    render(<Conta saldo={1000} realizarTransacao={funcaoRealizarTransacao} />);
    fireEvent.click(screen.getByText('Realizar operação'));

    expect(funcaoRealizarTransacao).toHaveBeenCalled();
  });
});

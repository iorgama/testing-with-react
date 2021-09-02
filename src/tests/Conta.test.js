import React from 'react';
import { render, screen } from '@testing-library/react';
import Conta from '../conta/Conta';

describe('Componente de conta', () => {
  it('Exibir o saldo da conta com a formatação monetária', () => {
    render(<Conta saldo={1000} />);
    const saldo = screen.getByTestId('saldo-conta');
    expect(saldo.textContent).toBe('R$ 1000');
  });
});

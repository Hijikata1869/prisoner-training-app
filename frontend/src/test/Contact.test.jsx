import React from 'react';
import { render, screen } from '@testing-library/react';

import { Contact } from '../containers/Contact';

describe('Contactコンポーネントテスト', () => {
  it('必要な情報が表示されていること', () => {
    render(<Contact />);
    expect(screen.getByText('お問い合わせ')).toBeInTheDocument();
    expect(screen.getByText('開発者メールアドレス')).toBeInTheDocument();
    expect(screen.getByText('liv.knk@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('開発者Twitter')).toBeInTheDocument();
    expect(screen.getByText('@ehn1869')).toBeInTheDocument();
  });
});
import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Questions } from '../containers/Questions';

describe('Questionsコンポーネントテスト', () => {
  it('必要な情報が表示されていること', () => {
    render(<Questions />);
    expect(screen.getByText('トレーニングメニュー')).toBeInTheDocument();
    expect(screen.getByText('ステップ')).toBeInTheDocument();
    expect(screen.getByText('詰まっているポイントや質問したいこと')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: '質問する'})).toBeTruthy();
  });
});
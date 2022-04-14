import React from "react";
import { render, screen } from "@testing-library/react";

import { Index } from "../containers/Index";

describe("Indexコンポーネントテスト", () => {
  it("トップページのボタン類が表示されているかどうか", () => {
    render(<Index />);
    expect(
      screen.getByRole("button", { name: "さっそく登録して使ってみる" })
    ).toBeTruthy();
    expect(
      screen.queryByRole("button", { name: "トレーニングを記録する" })
    ).not.toBeTruthy();
    expect(
      screen.getByRole("button", { name: "トレーニング記録ページへ" })
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "質問・アドバイスページへ" })
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: "マイページへ" })).toBeTruthy();
  });
});

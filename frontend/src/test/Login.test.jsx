import React from "react";
import { render, screen } from "@testing-library/react";

import { Login } from "../containers/Login";

describe("Loginコンポーネントテスト", () => {
  it("必要な要素が表示されていること", () => {
    render(<Login />);
    expect(screen.getByText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByText("パスワード")).toBeInTheDocument();
  });
});

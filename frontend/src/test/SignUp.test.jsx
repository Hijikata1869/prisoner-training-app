import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SignUp } from "../containers/SignUp";

describe("SignUpコンポーネントテスト", () => {
  it("必要な要素が表示されていること", () => {
    render(<SignUp />);
    expect(screen.getByText("ニックネーム")).toBeInTheDocument();
    expect(screen.getByText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByText("パスワード")).toBeInTheDocument();
    expect(screen.getByText("パスワード（確認用）")).toBeInTheDocument();
  });
  it("登録情報が何も入力されていなければ「登録する」ボタンがdisabledであること", () => {
    render(<SignUp />);
    const button = screen.getByRole("button", { name: "登録する" });
    expect(button).toBeDisabled();
  });
  it("登録情報が入力されれば、「登録する」ボタンが押せるようになること", () => {
    render(<SignUp />);

    userEvent.type(screen.getByLabelText("ニックネーム"), "test");
    userEvent.type(screen.getByLabelText("メールアドレス"), "test@example.com");
    userEvent.type(screen.getByLabelText("パスワード"), "password");
    userEvent.type(screen.getByLabelText("パスワード（確認用）"), "password");

    const button = screen.getByRole("button", { name: "登録する" });
    expect(button).not.toBeDisabled();
  });
});

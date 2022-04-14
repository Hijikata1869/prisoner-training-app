import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Questions } from "../containers/Questions";

describe("Questionsコンポーネントテスト", () => {
  it("必要な情報が表示されていること", () => {
    render(<Questions />);
    expect(screen.getByText("トレーニングメニュー")).toBeInTheDocument();
    expect(screen.getByText("ステップ")).toBeInTheDocument();
    expect(
      screen.getByText("詰まっているポイントや質問したいこと")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "質問する" })).toBeTruthy();
  });
  it("必要な情報を入力して「質問する」ボタンをクリックすると「質問を投稿しました」と画面のモーダルに表示されること", async () => {
    render(<Questions />);
    const trainingMenuButton = screen.getByRole(
      (role, element) => role === "button" && element.id === "trainingMenus"
    );
    const stepButton = screen.getByRole(
      (role, element) => role === "button" && element.id === "steps"
    );
    const submitButton = screen.getByRole("button", { name: "質問する" });
    userEvent.click(trainingMenuButton);
    userEvent.click(screen.getByText("プッシュアップ"));
    userEvent.click(stepButton);
    userEvent.click(screen.getByText("ステップ１"));
    userEvent.type(screen.getByRole("textbox"), "test");
    await userEvent.click(submitButton);
    const message = screen.findByText("質問を投稿しました");
    expect(message).toBeTruthy();
  });
});

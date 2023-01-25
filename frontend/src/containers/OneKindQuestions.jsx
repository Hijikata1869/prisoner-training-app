import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// apis
import { fetchOneKindQuestions } from "../apis/users";

export const OneKindQuestions = () => {
  const search = useLocation().search;

  const query = new URLSearchParams(search);

  const trainingMenu = query.get("training_menu");

  console.log(`search: ${search}, query: ${query}, trainingMenu: ${trainingMenu}`);

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchOneKindQuestions(trainingMenu)
      .then((res) => {
        setQuestions(res.data.questions);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <>
      {questions.map((question, index) => {
        return (
          <div key={index}>
            {`${question.training_menu}の${index + 1}番目の質問は、「${
              question.question
            }」です。`}
          </div>
        );
      })}
    </>
  );
};

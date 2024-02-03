import useApp from "@/hooks/useApp";
import { IQuestionImage } from "@/interfaces/app.interface";
import { ReactElement } from "react";

interface IQuestionCardImg {
  index: number;
  image: IQuestionImage;
}

export default function QuestionCardImg({
  index,
  image,
}: IQuestionCardImg): ReactElement {
  const { handleChangeQuestion } = useApp();

  return (
    <input
      type="file"
      onChange={(e: any) => {
        handleChangeQuestion(index, URL.createObjectURL(e.target.files[0]));
      }}
    />
  );
}

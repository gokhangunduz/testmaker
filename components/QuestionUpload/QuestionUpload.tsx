import { ReactElement } from "react";
import { BsFileEarmarkArrowUp } from "react-icons/bs";

interface IQuestionUpload {
  handleInputUploader: (files: FileList) => void;
}

export default function QuestionUpload({
  handleInputUploader,
}: Readonly<IQuestionUpload>): ReactElement {
  return (
    <div className="absolute bottom-4 right-4 z-20 cursor-pointer">
      <div className="bg-zinc-800 border-2 border-zinc-200 text-zinc-50 p-3.5 rounded-full opacity-50 hover:opacity-100 transition-500 hover:scale-125 relative">
        <BsFileEarmarkArrowUp size={24} />
        <input
          type="file"
          accept="image/*"
          multiple
          className=" absolute inset-0 cursor-pointer"
          onChange={(e) => {
            e.preventDefault();
            handleInputUploader(e.target.files as FileList);
          }}
          title="Questions"
        />
      </div>
    </div>
  );
}

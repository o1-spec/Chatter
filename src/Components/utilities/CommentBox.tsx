import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface CommentInterface {
  userId: string | undefined;
  handleComment: (e: React.FormEvent<HTMLFormElement>) => void;
  userComment: string;
  setUserComment: (Comment: string) => void;
}

function CommentBox({
  userComment,
  setUserComment,
  handleComment,
  userId,
}: CommentInterface) {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleComment(e);
  };

  const rows: number = 4;
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className="flex gap-2 flex-col">
        <textarea
          rows={rows}
          value={userComment}
          className="focus:outline-textBlue border-2 border-textBlack sm:w-[60vw] w-[80vw] p-2"
          onChange={(e) => setUserComment(e.target.value)}
        ></textarea>
        {!userId ? (
          <>
            <p>Please login or create an account</p>
            <button onClick={() => navigate("/login")}>Login / Sign Up</button>
          </>
        ) : (
          <>
            <button
              type="submit"
              className="text-textWhite text-[15px] text-center border bg-textBlue px-6 py-2 rounded-lg h-fit w-40 transition hover:bg-textWhite hover:text-textBlue border-textBlue duration-300"
            >
              Post Comment
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default CommentBox;

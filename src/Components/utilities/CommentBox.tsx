import { useNavigate } from "react-router-dom";

function CommentBox({ userComment, setUserComment, handleComment, userId }) {
  const navigate = useNavigate();
  return (
    <div>
      <form>
        <textarea
          rows="4"
          value={userComment}
          className="focus:outline-textBlue border-1 border-textBlack w-[60vw]"
          onChange={(e) => setUserComment(e.target.value)}
        ></textarea>
      </form>
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
            onClick={handleComment}
          >
            Post Comment
          </button>
        </>
      )}
    </div>
  );
}

export default CommentBox;

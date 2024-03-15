import { useNavigate } from "react-router-dom";

function CommentBox({ userComment, setUserComment, handleComment, userId }) {
  const navigate = useNavigate();
  return (
    <div>
      <form>
        <textarea
          rows="4"
          value={userComment}
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
          <button type="submit" onClick={handleComment}>
            Post Comment
          </button>
        </>
      )}
    </div>
  );
}

export default CommentBox;

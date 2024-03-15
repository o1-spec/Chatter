/* eslint-disable @typescript-eslint/no-unused-vars */
interface CommentProp {
  msg: string;
  comment: string
}


function Comments({ msg, comment } : CommentProp) {
  const { body, createdAt, name } = comment;
  return (
    <div>
      <div>{msg}</div>
    </div>
  );
}

export default Comments;

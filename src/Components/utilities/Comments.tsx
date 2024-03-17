/* eslint-disable @typescript-eslint/no-unused-vars */
interface CommentProp {
  comment: object;
}

function Comments({ comment }: CommentProp) {
  const { body, createdAt, name } = comment;
  return (
    <div className="flex items-center gap-6 pb-4 pt-2">
      <img className="w-16 h-fit" src="/Images/user.png" alt="User Picture" />
      <div>
        <h6 className="font-semibold text-[17px]">{name}</h6>
        <div className="flex justify-between gap-4">
          <p className="text-[15px]">{body}</p>
          <p>{createdAt.seconds}</p>
        </div>
      </div>
    </div>
  );
}

export default Comments;

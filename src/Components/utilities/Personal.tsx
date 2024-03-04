import { Link } from "react-router-dom";

function Personal() {
  return (
    <>
      <div className="pb-6">
        <h5 className="text-[17px] pb-5 text-textBlack font-semibold">
          Personal
        </h5>
        <ul className="flex flex-col gap-3.5 pl-6">
          <li>
            <Link className="flex items-center w-fit gap-3 text-[15px]" to="/blog/account">
              <img src="/Images/account.svg" className="w-3" alt="Feed-img" />
              <span>Account</span>
            </Link>
          </li>
          <li>
            <Link to="/blog/notification" className="flex items-center w-fit gap-3 text-[15px]">
              <img src="/Images/notifications.svg" alt="Bookmark" />
              <span>Notifications</span>
            </Link>
          </li>
        </ul>
      </div>
      <button className="text-textRed text-[15px]">
        Log Out
      </button>
    </>
  );
}

export default Personal;

import { Link } from "react-router-dom";

interface PersonalProps {
  blue: boolean;
  setBlue: (value: boolean) => void;
  activeLink: string | null;
  setBlogNav: (value: boolean) => void;
  setSearchOpen: (value: boolean) => void;
  setActiveLink: (value: string | null) => void;
}

function Personal({
  blue,
  setBlue,
  activeLink,
  setBlogNav,
  setSearchOpen,
  setActiveLink,
}: PersonalProps) {
  const handleLinkClick = (linkName: string) => {
    if (activeLink === linkName) {
      setActiveLink(null);
      setBlue(false);
    } else {
      setActiveLink(linkName);
      setBlue(true);
    }
  };

  return (
    <>
      <div className="pb-6">
        <h5 className="text-[17px] pb-5 text-textBlack font-semibold">
          Personal
        </h5>
        <ul className="flex flex-col gap-3.5 pl-6">
          <li>
            <Link
              className={`text-[15px] flex items-center gap-3 ${
                activeLink === "account" && blue ? "text-textBlue" : ""
              }`}
              onClick={() => {
                setSearchOpen(false);
                setBlogNav(false);
                handleLinkClick("account");
              }}
              to="/blog/account"
            >
              <img src="/Images/account.svg" className="w-3" alt="Feed-img" />
              <span>Account</span>
            </Link>
          </li>
          <li>
            <Link
              to="/blog/notification"
              className={`text-[15px] flex items-center gap-3 ${
                activeLink === "notification" && blue ? "text-textBlue" : ""
              }`}
              onClick={() => {
                setSearchOpen(false);
                setBlogNav(false);
                handleLinkClick("notification");
              }}
            >
              <img src="/Images/notifications.svg" alt="Bookmark" />
              <span>Notifications</span>
            </Link>
          </li>
        </ul>
      </div>
      <Link
        to="/blog/logout"
        onClick={() => {
          setSearchOpen(false);
          setBlogNav(false);
        }}
        className="text-textRed text-[15px]"
      >
        Log Out
      </Link>
    </>
  );
}

export default Personal;

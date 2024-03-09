import ForYou from "./ForYou";

function FeedBox({ forYou, featured, recent }) {
  return (
    <div className="border border-borderIcon pt-5 rounded-md">
      {forYou && <ForYou />}
    </div>
  );
}

export default FeedBox;

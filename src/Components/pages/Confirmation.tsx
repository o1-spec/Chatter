import ConfirmationBox from "../utilities/ConfirmationBox";

function Confirmation() {
  return (
    <div className="font-dmSans overflow-x-hidden">
      <div className="flex w-screen h-screen">
        <div className="relative h-full basis-[38%]">
          <div className="login-img absolute top-0 left-0 bottom-0 right-0 w-[95%] h-full -z-10"></div>
          <div className="flex items-center justify-center text-textWhite flex-col w-full h-full">
            <h5 className="text-4xl uppercase font-bold pb-6">Chatter</h5>
            <p className="text-[16px] px-8 pr-12">
              Unleash the Power of Words, Connect with Like-minded Readers and
              Writers
            </p>
          </div>
        </div>
        <div className="basis-[62%] pt-4 -translate-x-8">
          <ConfirmationBox />
        </div>
      </div>
    </div>
  );
}

export default Confirmation;

import Aos from "aos";
import { useEffect } from "react";
import 'aos/dist/aos.css'

function Why() {
  useEffect(() => {
    Aos.init({duration: 2000});
  }, []);
  return (
    <div
      data-aos="fade-up"
      className="lg:max-w-[1100px] my-0 mx-auto py-16 md:px-20 px-8"
    >
      <div className="pb-10">
        <h3 className="text-center text-3xl font-bold pb-3 text-textBlack">
          Why you should join chatter
        </h3>
        <p className="text-[16px]">
          Our goal is to make writers and readers see our platform as their next
          heaven for blogging, ensuring ease in interactions, connecting with
          like-minded peers, have access to favorite content based on interests
          and able to communicate your great ideas with people
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-12">
        <div className="flex flex-col gap-2 border border-borderIcon rounded-lg py-5 px-5 pr-7 shadow-sm">
          <div className=" bg-bgIcon w-12  p-4 rounded-full">
            <img src="/Images/Analytic.svg" alt="Analytics" />
          </div>
          <h6 className="text-lg font-semibold">Analytics</h6>
          <p className="text-[16px] lg:text-[15px]">
            Analytics to track the number of views, likes and comment and also
            analyze the performance of your articles over a period of time
          </p>
        </div>
        <div className="flex flex-col gap-2 border border-borderIcon rounded-lg py-5 px-5 pr-7 shadow-sm">
          <div className=" bg-bgIcon w-12  p-4 rounded-full">
            <img src="/Images/fluent_people.svg" alt="Social Interactions" />
          </div>
          <h6 className="text-lg font-semibold">Social interactions</h6>
          <p className="text-[16px] lg:text-[15px]">
            Users on the platform can interact with posts they like, comment and
            engage in discussions
          </p>
        </div>
        <div className="flex flex-col gap-2 border border-borderIcon rounded-lg py-5 px-5 pr-7 shadow-sm">
          <div className=" bg-bgIcon w-12  p-4 rounded-full">
            <img src="/Images/creation.svg" alt="Content Creation" />
          </div>
          <h6 className="text-lg font-semibold">Content creation</h6>
          <p className="text-[16px] lg:text-[15px]">
            Write nice and appealing with our in-built markdown, a rich text
            editor
          </p>
        </div>
      </div>
    </div>
  );
}

export default Why;

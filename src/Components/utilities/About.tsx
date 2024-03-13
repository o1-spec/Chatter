import Aos from "aos";
import { useEffect } from "react";
import 'aos/dist/aos.css'


function About() {
  useEffect(() => {
    Aos.init({duration: 2000});
  }, []);
  return (
    <div data-aos="fade-up" className="md:py-20 pb-20 pt-28 md:pt-36 lg:max-w-[1100px] my-0 mx-auto md:px-8 px-6">
      <div className="flex flex-col lg:flex-row gap-20">
        <div className="basis-[55%]">
          <h5 className="text-3xl font-semibold pb-8 md:text-center lg:text-start">About&nbsp;Chatter</h5>
          <p className="text-[15px] md:text-center lg:text-start">
            Chatter is a multi-functional platform where authors and readers can
            have access to their own content. It aims to be a traditional
            bookworm’s heaven and a blog to get access to more text based
            content. Our vision is to foster an inclusive and vibrant community
            where diversity is celebrated. We encourage open-mindedness and
            respect for all individuals, regardless of their backgrounds or
            beliefs. By promoting dialogue and understanding, we strive
          </p>
        </div>
        <div className="basis basis-[45%] md:flex md:items-center md:justify-center">
          <img src="/Images/People.png" alt="People-img" />
        </div>
      </div>
    </div>
  );
}

export default About;

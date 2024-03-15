import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { User } from "firebase/auth";

interface TextVariants extends Variants {
  initial: {
    x?: number;
    y?: number;
    opacity: number;
  };
  animate: {
    x?: number;
    y?: number;
    opacity: number;
    transition: {
      duration: number;
      staggerChildren?: number;
      repeat?: number;
    };
  };
  scrollButton: {
    opacity: number;
    y: number;
    transition: {
      duration: number;
      repeat: number;
    };
  };
  bgImage: {
    opacity: number;
    transition: {
      duration: number;
    };
  };
}

const textVariants: TextVariants = {
  initial: {
    x: -500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      staggerChildren: 0.1,
    },
  },
  scrollButton: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
  bgImage: {
    opacity: 0,
    transition: {
      duration: 2,
    },
  },
};

function Hero({ user }: { user: User | null }) {
  return (
    <div className="relative w-full h-full flex items-center lg:items-start justify-center md:py-28 py-32 lg:justify-start">
      <motion.div
        initial="initial"
        animate="animate"
        className={
          user
            ? "hero-bg absolute top-12 left-0 right-0 bottom-0 w-full h-[100%] -z-10"
            : "hero-bg absolute top-12 left-0 right-0 bottom-0 w-full h-[90%] -z-10"
        }
      ></motion.div>
      <motion.div
        variants={textVariants}
        initial="initial"
        animate="animate"
        className="flex flex-col gap-8 px-3 lg:px-20 md:pt-12 items-start"
      >
        <motion.h5
          variants={textVariants}
          className="text-[30px] md:text-4xl sm:text-[33px] text-textWhite text-center font-bold md:leading-[47px] leading-[38px] lg:text-start"
        >
          Welcome to Chatter: A Haven for Text-{" "}
          <span className="block"> Based Content</span>
        </motion.h5>
        <motion.p
          variants={textVariants}
          className="text-xl text-textWhite text-center lg:text-[16px]"
        >
          Unleash the Power of Words, Connect with Like-minded Readers and
          Writers
        </motion.p>
        {!user ? (
          <motion.div
            variants={textVariants}
            className="flex w-full items-center justify-center lg:items-start lg:justify-start"
          >
            <Link
              className="w-32 text-textWhite text-[14px]  bg-textBlue px-6 py-2 rounded-lg transition hover:bg-textWhite hover:text-textBlue border-textBlue duration-300 sm:px-8 sm:w-44 lg:w-[124px] lg:px-4 lg:text-[15px] sm:text-lg"
              to="/login"
            >
              Get Started
            </Link>
          </motion.div>
        ) : (
          ""
        )}
      </motion.div>
    </div>
  );
}

export default Hero;

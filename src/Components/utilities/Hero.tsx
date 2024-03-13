import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const textVariants = {
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
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1.2,
      },
    },
  },
};

function Hero({ user }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center py-28">
      <motion.div
        variants={textVariants.bgImage}
        initial="initial"
        animate="animate"
        className="hero-bg absolute top-0 left-0 right-0 bottom-0 w-full h-full -z-10"
      ></motion.div>
      <motion.div
        variants={textVariants}
        initial="initial"
        animate="animate"
        className="flex flex-col gap-8"
      >
        <motion.h5
          variants={textVariants}
          className="text-4xl text-textWhite font-bold leading-[47px]"
        >
          Welcome to Chatter: A Haven for Text-{" "}
          <span className="block"> Based Content</span>
        </motion.h5>
        <motion.p variants={textVariants} className="text-xl text-textWhite">
          Unleash the Power of Words, Connect with Like-minded Readers and
          Writers
        </motion.p>
        {!user ? (
          <motion.div variants={textVariants}>
            <Link
              className="w-32 text-textWhite text-[14px]  bg-textBlue px-6 py-2 rounded-lg transition hover:bg-textWhite hover:text-textBlue border-textBlue duration-300"
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

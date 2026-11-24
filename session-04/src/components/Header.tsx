"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// session 4
const navs = [
  { name: "Home", link: "/" },
  { name: "Blogs", link: "/blogs" },
  { name: "About Me", link: "/about" },
];

export default function Header() {
  const [showFullNav, setShowFullNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY;

      if (scrollDifference > 10 && currentScrollY > 80) {
        setShowFullNav(false);
      }

      if (scrollDifference < -10) {
        setShowFullNav(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      className="w-fit px-5 md:px-10 rounded-full flex justify-center items-center mx-auto sticky top-5 z-50 bg-linear-to-br from-[#020617] via-[#020617] to-[#0f172a] border-b-2 border-cyan-200/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      layout
      transition={{ layout: { duration: 0.35, ease: "easeInOut" } }}
    >
      <motion.div
        className="h-9 md:h-12 flex items-center justify-center"
        layout
      >
        {showFullNav ? (
          <motion.ul
            className="flex gap-8"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {navs.map((nav) => (
              <li
                className="text-sm md:text-lg font-semibold text-primary hover:text-cyan-200 transition"
                key={nav.link}
              >
                <Link href={nav.link}>{nav.name}</Link>
              </li>
            ))}
          </motion.ul>
        ) : (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/about">
              <motion.button
                className="flex items-center gap-2 py-2 bg-transparent text-sm md:text-lg text-primary font-semibold cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="w-1 h-1 md:h-2 md:w-2 rounded-full bg-primary"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                My Story
              </motion.button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </motion.header>
  );
}
// end of  session 4

import * as React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { NavLink } from 'react-router-dom';

interface MenuItem {
  label: string;
  href: string;
}

interface MenuVerticalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  children?: React.ReactNode; // For footer content
}

const menuVars: Variants = {
  initial: {
    x: '100%',
  },
  animate: {
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1] as const, // Cubic-bezier for smooth sliding
      when: 'beforeChildren',
      staggerChildren: 0.05,
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1] as const,
      when: 'afterChildren',
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const linkVars: Variants = {
  initial: {
    y: '30vh',
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    y: '30vh',
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

export const MenuVertical = ({
  isOpen,
  onClose,
  menuItems,
  children,
}: MenuVerticalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVars}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed left-0 top-0 w-full h-screen bg-[#2a1d15] text-cream-light p-10 z-40"
        >
          <div className="flex h-full flex-col">
            <motion.div variants={linkVars} initial="initial" animate="animate" exit="exit" className="flex justify-between items-center">
              <h1 className="text-lg font-bold">Menu</h1>
              <button onClick={onClose} className="text-cream-light" aria-label="Close menu">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </motion.div>
            <motion.div variants={menuVars} className="flex flex-col h-full justify-center items-center gap-6">
              {menuItems.map((item) => (
                <div className="overflow-hidden" key={item.label}>
                  <motion.div variants={linkVars} initial="initial" animate="animate" exit="exit">
                    <NavLink to={item.href} onClick={onClose} className="text-4xl font-extrabold uppercase text-cream-light hover:text-gold transition-colors duration-300">
                      {item.label}
                    </NavLink>
                  </motion.div>
                </div>
              ))}
            </motion.div>
            <motion.div variants={linkVars} initial="initial" animate="animate" exit="exit" className="flex justify-center items-center gap-4">{children}</motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

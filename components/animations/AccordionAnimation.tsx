import { motion, AnimatePresence } from "framer-motion";

interface AccordionAnimationProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function AccordionAnimation({
  isOpen,
  children,
}: AccordionAnimationProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

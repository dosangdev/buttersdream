import { motion } from "framer-motion";
import Image from "next/image";

interface SparkleBlinkProps {
  width: number;
  height: number;
  duration: number;
}

export default function SparkleBlink({
  width,
  height,
  duration,
}: SparkleBlinkProps) {
  return (
    <motion.div
      animate={{ opacity: [1, 0.2, 1] }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <Image
        src="/donate/sparkle.png"
        width={width}
        height={height}
        alt="sparkle effect"
        className="object-cover"
      />
    </motion.div>
  );
}

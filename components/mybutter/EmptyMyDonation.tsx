import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AnimatedSpeechBubbleText from "../animations/AnimatedSpeechBubbleText";

export default function EmptyMyDonation() {
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(path);
  };
  return (
    <div className="flex flex-col items-center">
      <p>Your Butter is not founded yet.</p>
      <div className=" w-full mt-[24px]  mx-auto">
        <div className="w-full flex justify-center">
          <motion.div
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "loop",
            }}
          >
            <Image
              src="/mybutter/empty-my-butter.png"
              alt="empty-my-butter"
              width={88}
              height={59}
              className="block mr-5"
            />
          </motion.div>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/butter-cry.png"
            width={122}
            height={77}
            alt="butter-cry"
            className="z-10"
          />
          <Image
            src="/donate/bread.png"
            width={248}
            height={113}
            alt="bread"
            className="-mt-[60px] z-0"
          />
        </div>
      </div>
      <div className="pt-[13px] flex items-center">
        <span className="font-bold pr-[14px]">NFT</span>
        <div className="flex items-center gap-1 pr-3">
          <span className="inline-block w-[18px] h-[18px] bg-white rounded-md border-2 border-black"></span>
          <span className="">Reserved</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-[18px] h-[18px] bg-primary rounded-md border-2 border-black"></span>
          <span className="">Not yet</span>
        </div>
      </div>
      <div className="relative mt-[28px]">
        <Image
          src="/mybutter/mybutter-empty-border.png"
          width={338}
          height={89}
          alt="mybutter-empty-border"
        />
        <p className="text-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-6">
          <div>Do you wanna get</div>
          <div>YoUR BUTTER?</div>
        </p>
      </div>
      <button
        className="py-[5px] px-[25px] border-4 border-black rounded-3xl bg-primary mt-[18px]"
        onClick={() => handleClick("/donate")}
      >
        Yes!
      </button>
    </div>
  );
}

import Image from "next/image";
import SparkleBlink from "./animations/SparkleBlink";

export default function ConnectWalletEffect() {
  return (
    <div className="relative">
      <div>
        <Image
          src="/donate/donate-arrow.png"
          alt="donate arrow"
          width={20}
          height={20}
          className="object-contain"
        />
      </div>
      <div className="absolute top-6 -left-9">
        <div className="relative">
          <Image
            src="/butterfly-basic.png"
            alt="butterfly"
            width={36}
            height={22}
            className="object-contain"
          />
          <div className="absolute -top-2 -left-1">
            <SparkleBlink width={11} height={12} duration={1} />
          </div>
          <div className="absolute top-0 -left-4">
            <SparkleBlink width={12} height={14} duration={1.1} />
          </div>
          <div className="absolute bottom-1 -right-3">
            <SparkleBlink width={11} height={12} duration={0.8} />
          </div>
          <div className="absolute -bottom-3 -right-5">
            <SparkleBlink width={11} height={12} duration={1} />
          </div>
          <div className="absolute -bottom-4 right-1">
            <SparkleBlink width={11} height={12} duration={0.7} />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 flex justify-between items-center max-w-md w-full h-[47px] mx-auto bg-[url('/nav/navbar.png')] bg-contain sm:bg-cover  bg-center bg-no-repeat`}
    >
      <div className="flex justify-around w-full max-w-md items-center relative text-black">
        <div className="cursor-pointer " onClick={() => handleClick("/")}>
          <Image
            src={pathname === "/" ? "/nav/home-focus.png" : "/nav/home.png"}
            alt="home image"
            className="object-contain"
            width={28}
            height={30}
            priority
          />
        </div>
        <div className="cursor-pointer" onClick={() => handleClick("/ranking")}>
          <Image
            src={
              pathname === "/ranking"
                ? "/nav/ranking-focus.png"
                : "/nav/ranking.png"
            }
            alt="ranking image"
            className="object-contain"
            width={34}
            height={27}
            priority
          />
        </div>
        <div></div>

        {/* 코인 아이콘 */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-10 z-10">
          <button
            onClick={() => handleClick("/tutorial")}
            className="rounded-full bg-transparent p-2 flex items-center justify-center cursor-pointer"
          >
            <Image
              src="/butter-coin.png"
              alt="coin image"
              className="object-contain"
              width={50}
              height={49}
              priority
            />
          </button>
        </div>
        <div className="cursor-pointer" onClick={() => handleClick("/FAQ")}>
          <Image
            src={pathname === "/FAQ" ? "/nav/FAQ-focus.png" : "/nav/FAQ.png"}
            alt="about image"
            className="object-contain"
            width={17}
            height={31}
            priority
          />
        </div>
        <div className="cursor-pointer" onClick={() => handleClick("/profile")}>
          <Image
            src={
              pathname === "/profile"
                ? "/nav/profile-focus.png"
                : "/nav/profile.png"
            }
            alt="profile image"
            className="object-contain"
            width={27}
            height={22}
            priority
          />
        </div>
      </div>
    </nav>
  );
}

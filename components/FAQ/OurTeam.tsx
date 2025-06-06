import Image from "next/image";

const team = [
  {
    name: "Lia",
    nameColor: "#FF5B5B",
    username: "babytomato.eth",
    image: "/FAQ/LIA-pfp.png",
    backgroundColor: "#ffe3e3",
    role: "Marketer & PM",
    link: "https://farcaster.xyz/babytomato.eth",
  },
  {
    name: "Julia",
    nameColor: "#0CAAFF",
    username: "juliaoh",
    image: "/FAQ/Julia-pfp.png",
    backgroundColor: "#E4F5FF",
    role: "Marketer",
    link: "https://farcaster.xyz/juliaoh",
  },
  {
    name: "Tinydo",
    nameColor: "#6AEE92",
    username: "sangdo",
    image: "/FAQ/Tinydo-pfp.png",
    backgroundColor: "#E6FCE4",
    role: "Developer",
    link: "https://farcaster.xyz/sangdo",
  },
  {
    name: "WASABI",
    nameColor: "#FF92B3",
    username: "wasabikim",
    image: "/FAQ/WASABI-pfp.png",
    backgroundColor: "#FFECF2",
    role: "Marketer & Designer",
    link: "https://farcaster.xyz/wasabikim",
  },
];

export default function OurTeam() {
  return (
    <div className="flex flex-col gap-4 text-xs ">
      <p className="break-words whitespace-pre-line text-xs">
        Click to see there warpcast profile
      </p>

      <div className="w-full grid grid-cols-2 gap-2 ">
        {team.map((member) => (
          <a
            key={member.username}
            href={member.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative h-[167px] flex flex-col items-center justify-between pt-4 pb-1 rounded-xl w-full`}
            style={{
              backgroundColor: member.backgroundColor,
            }}
          >
            <div className="flex flex-col items-center">
              <div
                className={`font-bold text-sm mb-1`}
                style={{ color: member.nameColor }}
              >
                {member.name}
              </div>

              <div className="text-[7px] text-black mb-1">{member.role}</div>
            </div>
            <Image
              src={member.image}
              alt={member.name}
              width={100}
              height={110}
              className="rounded-lg mb-2 bg-gray-50"
              style={{
                backgroundColor: member.backgroundColor,
              }}
            />

            <div className="text-[7px] text-white absolute bottom-3.5">
              @{member.username}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

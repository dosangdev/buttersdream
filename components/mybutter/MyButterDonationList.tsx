import { MyButterDonationCard } from "./MyButterDonationCard";

export default function MyButterDonationList({
  userData,
}: {
  userData: any[];
}) {
  return (
    <div className="w-full mt-[20px]">
      {userData.map((item, index) => (
        <MyButterDonationCard key={index} item={item} index={index} />
      ))}
    </div>
  );
}

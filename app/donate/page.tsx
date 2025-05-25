import DonatePageComponent from "@/components/donate/DonatePage";
import { donatePageData } from "@/components/donate/DonateData";

export default function DonatePage() {
  return (
    <main className="flex flex-col items-center pt-[109px] relative select-none">
      <div className="">
        <DonatePageComponent {...donatePageData} />
      </div>
    </main>
  );
}

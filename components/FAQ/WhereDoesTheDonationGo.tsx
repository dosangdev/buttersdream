import Image from "next/image";

export default function WhereDoesTheDonationGo() {
  return (
    <div className="flex flex-col gap-4 text-xs">
      <p className="break-words whitespace-pre-line">
        A community vote will be held on Warpcast mid-season to choose the
        donation recipient.
      </p>
      <p className="break-words whitespace-pre-line">
        At the end of the season, all funds will be donated to a selected
        charitable organization.
      </p>
      <p className="break-words whitespace-pre-line">
        The donation details will be publicly shared for transparency.
      </p>
      <div className="flex justify-center">
        <Image
          src="/FAQ/whereDoesTheDonation-earth.png"
          width={230}
          height={104}
          alt="earth image"
          className="object-contain"
        />
      </div>
    </div>
  );
}

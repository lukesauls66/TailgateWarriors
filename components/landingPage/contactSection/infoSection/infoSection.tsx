import PurposeSection from "./purposeSection";
import NumberSection from "./numberSection";
import AvailabilitySection from "./availabilitySection";

export default function InfoSection() {
  return (
    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-6">
      <PurposeSection />
      <NumberSection />
      <AvailabilitySection />
    </div>
  );
}

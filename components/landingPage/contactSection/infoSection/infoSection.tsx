import PurposeSection from "./purposeSection";
import NumberSection from "./numberSection";

export default function InfoSection() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <PurposeSection />
      <NumberSection />
    </div>
  );
}

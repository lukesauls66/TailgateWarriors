import PurposeSection from "./purposeSection";
import NumberSection from "./numberSection";

export default function InfoSection() {
  return (
    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-6">
      <img src="/tw-logo-no-bg.PNG" alt="Logo Image" className="w-[70%]" />
      <PurposeSection />
      <NumberSection />
    </div>
  );
}

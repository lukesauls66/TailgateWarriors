import Navbar from "./navbar";

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

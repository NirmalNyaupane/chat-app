import Link from "next/link";
import fistFooterData from "@/constants/footerdata";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="bg-transparant py-9">
      © ChatTak {year}.
    </footer>
  );
};

export default Footer;

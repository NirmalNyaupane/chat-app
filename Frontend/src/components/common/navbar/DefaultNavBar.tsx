"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { CSSProperties, useState } from "react";
type LinkItems = {
  label: string;
  url: string;
};

interface props {
  linkItems?: LinkItems[];
  className?: string;
  style?: CSSProperties;
}

const DefaultNavBar = ({ linkItems, className, style }: props) => {
  const [isFoucs, setFocus] = useState(false);
  const [isLoggin, setIsLogin] = useState(false);
  const path = usePathname()

  return (
    <>
      <header
        className={cn(`max-width bg-transparent py-5 ${className}`)}
      >
        <nav className="flex justify-between items-center relative w-[full]">
          {/* Logo section  */}
          <div className="flex items-center gap-4">
            <Link href={"/"}>
              <h1 className="text-4xl font-bold gradient-text">
                Chat Tak
              </h1>
            </Link>
          </div>
          {linkItems && (
            <div className="hidden md:flex h-5 items-center space-x-4 text-white text-md font-bold">
              {linkItems.map((singleLink, ind) => {
                return <div key={(ind + 98) * 37}>
                  <Link href={singleLink.url}>{singleLink.label}</Link>
                </div>
              })}
            </div>
          )}
        </nav>
      </header>
      {/* <div className="border-t border-white" /> */}

    </>
  );
};

export default DefaultNavBar;

"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { CSSProperties, useState } from "react";
import { GiChatBubble } from "react-icons/gi";
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

  return (
    <>
      <header
        className={cn(`bg-transparent py-6 ${className}`)}
      >
        <nav className="flex justify-between items-center relative w-[full]">
          {/* Logo section  */}
          <div className="flex items-center gap-4">
            <Link href={"/"} className="text-5xl text-green-500">
              <GiChatBubble />
            </Link>
          </div>
          {linkItems && (
            <div className="hidden md:flex h-5 items-center space-x-4 text-md">
              {linkItems.map((singleLink, ind) => {
                return <div key={(ind + 98) * 37}>
                  <Link href={singleLink.url} className="hover:border-b-2 hover:border-b-green-500">{singleLink.label}</Link>
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

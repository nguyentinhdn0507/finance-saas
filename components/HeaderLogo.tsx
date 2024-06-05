import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HeaderLogo() {
  return (
    <Link href={"/"}>
      <div className="items-center hidden lg:flex">
        <Image src="/logo.svg" height={100} width={150} alt="logo" />
      </div>
    </Link>
  );
}

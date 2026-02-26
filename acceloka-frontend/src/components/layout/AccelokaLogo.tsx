"use client";

import Image from "next/image";

const AccelokaLogo = () => {
  return (
    <div>
      <Image
        src="/images/logo/logo_with_text.svg"
        alt="Acceloka. Your Plans, Accelerated"
        preload={true}
        width={250}
        height={80}
      />
    </div>
  );
};

export default AccelokaLogo;

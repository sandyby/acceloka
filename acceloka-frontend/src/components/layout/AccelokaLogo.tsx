"use client";

import Image from "next/image";

const AccelokaLogo = () => {
  return (
    <div>
      <Image
        src="/images/logo/logo_with_text.svg"
        alt="Acceloka. Your Plans, Accelerated"
        preload={true}
        width="0"
        height="0"
        style={{ width: '240px', height: "auto" }}
      />
    </div>
  );
};

export default AccelokaLogo;

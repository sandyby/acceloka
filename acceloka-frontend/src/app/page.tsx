import Image from "next/image";
import AccelokaLogoWithText from "../../public/logo/logo_with_text.svg";
import AccelokaLogo from "../../public/logo/logo.svg";
import AccelokaLogoText from "../../public/logo/logos_text.svg";

export default function Home() {
  return (
    <main
      className="scroll-smooth"
    >
      <section
        className="min-h-dvh min-w-dvw grid place-items-center bg-secondary-900"
      >
        <Image
          src={AccelokaLogoWithText}
          alt="Acceloka. Your Plans, Accelerated"
          width={598}
          height={300}
          priority
        />
      </section>
      <section
        className="min-h-dvh min-w-dvw bg-white-900 grid place-items-center"
      >
        <Image
          src={AccelokaLogo}
          alt="Acceloka"
          width={300}
          height={78}
          priority
        />
        <div>
          Flights
        </div>
      </section>
    </main>
  );
}

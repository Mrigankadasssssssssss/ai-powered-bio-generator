import AnimatedGradientText from "@/components/animated-gradient-text";
import UserInput from "@/components/home/UserInput";
import UserOutput from "@/components/home/UserOutput";
import { BioProvider } from "@/context/BioContext";
import { ChevronRight, Star } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative grid  grid-cols-1 slg:grid-cols-2 gap-12   px-4 py-12 sm:py-16 sm:px-8 md:px-10 slg:p-16 lg:p-24">
      <div className="col-span-full group w-full flex flex-col items-center justify-center space-y-2 sm:space-y-4 mb-4 text-center">
        <Link href="https://github.com" target="_blank" className="">
          <AnimatedGradientText className="px-4 py-2 rounded-full">
            <Star className="w-6 h-6 fill-yellow-300 text-yellow-500" />
            <hr className="h-4 mx-2 w-[1px] bg-gray-400" />
            Star on GitHub
            <ChevronRight className="w-6 h-4 text-gray-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </Link>
        <h1 className="font-extrabold mx-auto text-center text-4xl md:text-5xl slg:text-6xl lg:text-7xl mt-3 w-full lg:w-[90%] pt-4 uppercase">
          CRAFT THE ANY BIO IN SECONDS!
        </h1>
        <p className="md:text-lg sm:text-base text-sm text-accent">
          Just answer the few questions,and we will generate who{" "}
          <strong>You</strong> are.😋😎
        </p>
      </div>

      <BioProvider>
        <UserInput />
        <UserOutput />
      </BioProvider>
    </main>
  );
}

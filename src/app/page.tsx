import { Icons, Wrapper } from "@/components";
import { Button, buttonVariants } from "@/components/ui/Button";
import { ArrowRight, BadgeCheck, Check, CircleCheck, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="bg-slate-50">
      <section className="">
        <Wrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                <Image
                  src="/cartoons/phone-cover-change.svg"
                  alt="snake"
                  width={1024}
                  height={1024}
                  className="w-full object-cover"
                />
              </div>
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold text-5xl !leading-tight md:text-6xl lg:text-7xl">
                Create a{" "}
                <span className="bg-primary text-background rounded-md px-2">
                  Perfect
                </span>{" "}
                Phone Case Design
              </h1>
              <p className="text-lg mt-8 lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Elevate your design with a,{" "}
                <span className="font-semibold">one-of-a-kind</span> phone case
                that reflects your personality.
                {/* TODO: Add a trade mark to show that the user we make phone cases with unused tree trunks to reduce carbon emission ⚡ */}
              </p>

              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="text-primary w-5 h-5 shrink-0" />
                    High-quality, eco-friendly materials
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="text-primary w-5 h-5 shrink-0" />
                    Crystal clear, vibrant prints with lifetime guarantee
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="text-primary w-5 h-5 shrink-0" />
                    Wide selection of designs to match any style
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="text-primary w-5 h-5 shrink-0" />
                    Easy-to-use design platform
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="text-primary w-5 h-5 shrink-0" />
                    Fast and affordable shipping
                  </li>
                </div>
              </ul>

              <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex -space-x-4">
                  <Image
                    src="/users/1.jpg"
                    alt="user"
                    width={1024}
                    height={1024}
                    className="w-10 h-10 inline-block rounded-full ring-2 ring-muted object-cover"
                  />
                  <Image
                    src="/users/2.jpg"
                    alt="user"
                    width={1024}
                    height={1024}
                    className="w-10 h-10 inline-block rounded-full ring-2 ring-muted object-cover"
                  />
                  <Image
                    src="/users/3.jpg"
                    alt="user"
                    width={1024}
                    height={1024}
                    className="w-10 h-10 inline-block rounded-full ring-2 ring-muted object-cover"
                  />
                  <Image
                    src="/users/4.jpg"
                    alt="user"
                    width={1024}
                    height={1024}
                    className="w-10 h-10 inline-block rounded-full ring-2 ring-muted object-cover"
                  />
                  <Image
                    src="/users/5.jpg"
                    alt="user"
                    width={1024}
                    height={1024}
                    className="w-10 h-10 inline-block rounded-full ring-2 ring-muted object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between items-center sm:items-start">
                  <div className="flex gap-0.5">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <Star className="w-4 h-4 text-primary fill-primary" />
                  </div>

                  <p className="text-sm">
                    <span className="font-semibold">2.364</span> happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
            <div className="relative md:max-w-xl">
              <Image
                src="/your-image.svg"
                alt="user"
                width={1024}
                height={1024}
                className="w-40 left-64 -top-20 absolute select-none hidden sm:block lg:hidden xl:block"
              />
              <Image
                src="/line.png"
                alt="user"
                width={1024}
                height={1024}
                className="absolute w-20 -left-6 -bottom-6 select-none"
              />
            </div>
          </div>
        </Wrapper>
      </section>
    </div>
  );
};

export default HomePage;

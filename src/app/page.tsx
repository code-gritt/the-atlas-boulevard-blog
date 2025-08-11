import { Wrapper } from "@/components";
import ClientWrapper from "@/components/client-wrapper";
import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const HomePage = () => {
  return (
    <ClientWrapper>
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
                <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold text-3xl !leading-tight md:text-4xl lg:text-5xl">
                  The right destination for
                  <span className="bg-primary text-background rounded-md px-2">
                    cosmopolitan stories
                  </span>{" "}
                  , culture, and insights
                </h1>

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
                      <span className="font-semibold">2.364</span> happy users
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
    </ClientWrapper>
  );
};

export default HomePage;

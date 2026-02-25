import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";

interface BulletItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

interface BenefitsProps {
  imgPos?: "left" | "right";
  data: {
    imgPos?: "left" | "right";
    title: string;
    desc: string;
    image: string;
    bullets: BulletItem[];
  };
}

export const Benefits = (props: Readonly<BenefitsProps>) => {
  const { data } = props;

  return (
    <Container className="flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap">
      <div
        className={`flex items-center justify-center w-full lg:w-1/2 ${
          props.imgPos === "right" ? "lg:order-1" : ""
        }`}
      >
        <div className="w-full max-w-[521px]">
          <Image
            src={data.image}
            width={521}
            height={521}
            alt={data.title}
            sizes="(min-width: 1024px) 520px, 100vw"
            className="object-cover rounded-3xl border border-trueGray-800 bg-trueGray-950/35"
          />
        </div>
      </div>

      <div
        className={`flex flex-wrap items-center w-full lg:w-1/2 ${
          data.imgPos === "right" ? "lg:justify-end" : ""
        }`}
      >
        <div>
          <div className="flex flex-col w-full mt-4">
            <div className="text-xs font-semibold tracking-widest text-brand-500 uppercase">
              Fordeler
            </div>

            <h3 className="max-w-2xl mt-3 text-3xl font-semibold leading-tight tracking-tight text-white lg:text-4xl">
              {data.title}
            </h3>

            <p className="max-w-2xl py-4 text-base leading-relaxed text-trueGray-300 lg:text-lg">
              {data.desc}
            </p>
          </div>

          <div className="w-full mt-2">
            {data.bullets.map((item, index) => (
              <Benefit key={index} title={item.title} icon={item.icon}>
                {item.desc}
              </Benefit>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

interface BenefitItemProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function Benefit(props: Readonly<BenefitItemProps>) {
  return (
    <div className="flex items-start mt-6 gap-4">
      <div className="flex items-center justify-center flex-shrink-0 mt-0.5 rounded-2xl w-11 h-11 border border-brand-500/25 bg-brand-600/15">
        {React.cloneElement(props.icon as React.ReactElement, {
          className: "w-7 h-7 text-brand-200",
        })}
      </div>

      <div className="min-w-0">
        <h4 className="text-lg font-semibold text-white">{props.title}</h4>
        <p className="mt-1 text-sm leading-relaxed text-trueGray-300">
          {props.children}
        </p>
      </div>
    </div>
  );
}
import React from "react";
import { Container } from "@/components/Container";

interface SectionTitleProps {
  preTitle?: string;
  title?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
}

export const SectionTitle = (props: Readonly<SectionTitleProps>) => {
  const isLeft = props.align === "left";

  return (
    <Container
      className={`flex w-full flex-col mt-4 ${
        isLeft ? "" : "items-center justify-center text-center"
      }`}
    >
      {props.preTitle && (
        <div className="text-xs font-semibold tracking-widest text-brand-500 uppercase">
          {props.preTitle}
        </div>
      )}

      {props.title && (
        <h2 className="max-w-3xl mt-3 text-3xl font-semibold leading-tight tracking-tight text-white lg:text-4xl">
          {props.title}
        </h2>
      )}

      {props.children && (
        <p className="max-w-3xl py-4 text-base leading-relaxed text-trueGray-300 lg:text-lg">
          {props.children}
        </p>
      )}
    </Container>
  );
};
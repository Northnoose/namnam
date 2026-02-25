import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";

// TODO: Replace placeholder image URLs with real user avatars (80x80 recommended)
// TODO: Replace all [PLACEHOLDER] tokens with your actual testimonial content

export const Testimonials = () => {
  return (
    <Container>
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <TestimonialCard variant="wide">
          <p className="text-lg sm:text-xl leading-relaxed text-white">
            <Mark>[TESTIMONIAL_HIGHLIGHT_1]</Mark>
            <span className="text-trueGray-200">[TESTIMONIAL_TEXT_1]</span>
          </p>

          <Avatar
            image="https://placehold.co/80x80"
            name="[TESTIMONIAL_AUTHOR_1]"
            title="[TESTIMONIAL_ROLE_1]"
          />
        </TestimonialCard>

        <TestimonialCard>
          <p className="text-lg sm:text-xl leading-relaxed text-white">
            <Mark>[TESTIMONIAL_HIGHLIGHT_2]</Mark>
            <span className="text-trueGray-200">[TESTIMONIAL_TEXT_2]</span>
          </p>

          <Avatar
            image="https://placehold.co/80x80"
            name="[TESTIMONIAL_AUTHOR_2]"
            title="[TESTIMONIAL_ROLE_2]"
          />
        </TestimonialCard>

        <TestimonialCard>
          <p className="text-lg sm:text-xl leading-relaxed text-white">
            <Mark>[TESTIMONIAL_HIGHLIGHT_3]</Mark>
            <span className="text-trueGray-200">[TESTIMONIAL_TEXT_3]</span>
          </p>

          <Avatar
            image="https://placehold.co/80x80"
            name="[TESTIMONIAL_AUTHOR_3]"
            title="[TESTIMONIAL_ROLE_3]"
          />
        </TestimonialCard>
      </div>
    </Container>
  );
};

function TestimonialCard({
  children,
  variant = "normal",
}: {
  children: React.ReactNode;
  variant?: "normal" | "wide";
}) {
  return (
    <div
      className={`flex flex-col justify-between w-full h-full rounded-3xl border border-trueGray-800 bg-trueGray-950/35 p-6 sm:p-8 ${
        variant === "wide" ? "lg:col-span-2 xl:col-auto" : ""
      }`}
    >
      {children}
    </div>
  );
}

interface AvatarProps {
  image: string;
  name: string;
  title: string;
}

function Avatar(props: Readonly<AvatarProps>) {
  return (
    <div className="flex items-center mt-8 gap-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14 border border-trueGray-800 bg-trueGray-900/40">
        <Image
          src={props.image}
          width={56}
          height={56}
          sizes="56px"
          alt={props.name}
          className="w-14 h-14 object-cover"
        />
      </div>
      <div className="min-w-0">
        <div className="text-base font-semibold text-white truncate">
          {props.name}
        </div>
        <div className="text-sm text-trueGray-400 truncate">{props.title}</div>
      </div>
    </div>
  );
}

function Mark(props: { readonly children: React.ReactNode }) {
  return (
    <>
      {" "}
      <mark className="text-white bg-brand-600/15 rounded-xl ring-1 ring-brand-500/25 px-2 py-1">
        {props.children}
      </mark>{" "}
    </>
  );
}
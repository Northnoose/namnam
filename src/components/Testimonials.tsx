import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";

// TODO: Replace placeholder image URLs with real user avatars (80x80 recommended)
// TODO: Replace all [PLACEHOLDER] tokens with your actual testimonial content

export const Testimonials = () => {
  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        <div className="lg:col-span-2 xl:col-auto">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-2xl leading-normal ">
              <Mark>[TESTIMONIAL_HIGHLIGHT_1]</Mark>
              [TESTIMONIAL_TEXT_1]
            </p>

            <Avatar
              image="https://placehold.co/80x80"
              name="[TESTIMONIAL_AUTHOR_1]"
              title="[TESTIMONIAL_ROLE_1]"
            />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-2xl leading-normal ">
              <Mark>[TESTIMONIAL_HIGHLIGHT_2]</Mark>
              [TESTIMONIAL_TEXT_2]
            </p>

            <Avatar
              image="https://placehold.co/80x80"
              name="[TESTIMONIAL_AUTHOR_2]"
              title="[TESTIMONIAL_ROLE_2]"
            />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-2xl leading-normal ">
              <Mark>[TESTIMONIAL_HIGHLIGHT_3]</Mark>
              [TESTIMONIAL_TEXT_3]
            </p>

            <Avatar
              image="https://placehold.co/80x80"
              name="[TESTIMONIAL_AUTHOR_3]"
              title="[TESTIMONIAL_ROLE_3]"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

interface AvatarProps {
  image: string;
  name: string;
  title: string;
}

function Avatar(props: Readonly<AvatarProps>) {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
        <Image
          src={props.image}
          width={40}
          height={40}
          alt="Avatar"
        />
      </div>
      <div>
        <div className="text-lg font-medium">{props.name}</div>
        <div className="text-gray-600 dark:text-gray-400">{props.title}</div>
      </div>
    </div>
  );
}

function Mark(props: { readonly children: React.ReactNode }) {
  return (
    <>
      {" "}
      <mark className="text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4 dark:ring-indigo-900 dark:bg-indigo-900 dark:text-indigo-200">
        {props.children}
      </mark>{" "}
    </>
  );
}

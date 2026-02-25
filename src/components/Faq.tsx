"use client";
import React from "react";
import { Container } from "@/components/Container";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

// TODO: Replace all [PLACEHOLDER] tokens with your actual FAQ questions and answers

export const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item) => (
          <div key={item.question} className="mb-4">
            <Disclosure>
              {({ open }) => (
                <>
                  <DisclosureButton
                    className="flex items-center justify-between w-full px-5 py-4 text-left rounded-2xl
                               border border-trueGray-800 bg-trueGray-950/35
                               text-white hover:bg-trueGray-900/40
                               focus:outline-none focus-visible:ring focus-visible:ring-brand-600/25"
                  >
                    <span className="text-base font-semibold">{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-brand-500 transition-transform`}
                    />
                  </DisclosureButton>

                  <DisclosurePanel className="px-5 pt-3 pb-4 text-sm leading-relaxed text-trueGray-300">
                    {item.answer}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
};

const faqdata = [
  {
    question: "[FAQ_QUESTION_1]",
    answer: "[FAQ_ANSWER_1]",
  },
  {
    question: "[FAQ_QUESTION_2]",
    answer: "[FAQ_ANSWER_2]",
  },
  {
    question: "[FAQ_QUESTION_3]",
    answer: "[FAQ_ANSWER_3]",
  },
];
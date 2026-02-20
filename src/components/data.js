import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

// TODO: Replace placeholder image URLs with your actual benefit section images (521x521)
// TODO: Replace all [PLACEHOLDER] tokens with your actual content

const benefitOne = {
  title: "[BENEFIT_SECTION_1_TITLE]",
  desc: "[BENEFIT_SECTION_1_DESCRIPTION]",
  image: "https://placehold.co/521x521",
  bullets: [
    {
      title: "[FEATURE_TITLE_1]",
      desc: "[FEATURE_DESCRIPTION_1]",
      icon: <FaceSmileIcon />,
    },
    {
      title: "[FEATURE_TITLE_2]",
      desc: "[FEATURE_DESCRIPTION_2]",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "[FEATURE_TITLE_3]",
      desc: "[FEATURE_DESCRIPTION_3]",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: "[BENEFIT_SECTION_2_TITLE]",
  desc: "[BENEFIT_SECTION_2_DESCRIPTION]",
  image: "https://placehold.co/521x521",
  bullets: [
    {
      title: "[FEATURE_TITLE_4]",
      desc: "[FEATURE_DESCRIPTION_4]",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "[FEATURE_TITLE_5]",
      desc: "[FEATURE_DESCRIPTION_5]",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "[FEATURE_TITLE_6]",
      desc: "[FEATURE_DESCRIPTION_6]",
      icon: <SunIcon />,
    },
  ],
};


export {benefitOne, benefitTwo};

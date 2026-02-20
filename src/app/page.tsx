import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { Benefits } from "@/components/Benefits";
import { Video } from "@/components/Video";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";

import { benefitOne, benefitTwo } from "@/components/data";
export default function Home() {
  return (
    <Container>
      <Hero />
      <SectionTitle
        preTitle="[BENEFITS_PRETITLE]"
        title="[BENEFITS_TITLE]"
      >
        [BENEFITS_DESCRIPTION]
      </SectionTitle>

      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />

      <SectionTitle
        preTitle="[VIDEO_PRETITLE]"
        title="[VIDEO_TITLE]"
      >
        [VIDEO_DESCRIPTION]
      </SectionTitle>

      {/* TODO: Replace with your YouTube video ID */}
      <Video videoId="[YOUTUBE_VIDEO_ID]" />

      <SectionTitle preTitle="[TESTIMONIALS_PRETITLE]" title="[TESTIMONIALS_TITLE]">
        [TESTIMONIALS_DESCRIPTION]
      </SectionTitle>

      <Testimonials />

      <SectionTitle preTitle="[FAQ_PRETITLE]" title="[FAQ_TITLE]">
        [FAQ_DESCRIPTION]
      </SectionTitle>

      <Faq />
      <Cta />
    </Container>
  );
}

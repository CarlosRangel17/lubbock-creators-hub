import { Hero } from "./Hero";
import { LocalSection } from "./LocalSection";
import { Projects } from "./Projects";
import { ContactForm } from "./ContactForm";

export function HomePage() {
  return (
    <>
      <Hero />
      <LocalSection />
      <Projects />
      <ContactForm />
    </>
  );
}

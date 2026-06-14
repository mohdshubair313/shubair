import HeroSection from "@/components/HeroSection";
import FeaturedWork from "@/components/FeaturedWork";
import VideoWalkthrough from "@/components/VideoWalkthrough";
import ExperienceSection from "@/components/ExperienceSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import GitHubContributions from "@/components/GitHubContributions";
import AIChatButton from "@/components/AIChatButton";
import { getAllBlogs } from "@/lib/getMdxContent";

const Home = () => {
  const blogs = getAllBlogs();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-4 sm:px-0">
      {/* Hero section — its own card */}
      <HeroSection />

      {/* Main content card — srbh.site style single card with sections separated by dividers */}
      <div className="section-card flex flex-col">
        {/* GitHub Contributions */}
        <GitHubContributions />

        <div className="section-divider" />

        {/* Projects */}
        <FeaturedWork />

        <div className="section-divider" />

        {/* Experience */}
        <ExperienceSection />

        <div className="section-divider" />

        {/* Blog / Writing */}
        <BlogSection blogs={blogs} />

        <div className="section-divider" />

        {/* Contact */}
        <ContactSection />
      </div>

      {/* Floating elements */}
      <VideoWalkthrough />
      <AIChatButton />
    </div>
  );
};

export default Home;

import HeroSection from "@/components/HeroSection";
import FeaturedWork from "@/components/FeaturedWork";
import VideoWalkthrough from "@/components/VideoWalkthrough";
import ExperienceSection from "@/components/ExperienceSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import { getAllBlogs } from "@/lib/getMdxContent";

const Home = () => {
  const blogs = getAllBlogs();

  return (
    <main>
      <HeroSection />
      <VideoWalkthrough />
      <FeaturedWork />
      <ExperienceSection />
      <BlogSection blogs={blogs} />
      <ContactSection />
    </main>
  );
};

export default Home;

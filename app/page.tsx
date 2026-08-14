import Navbar from "./components/Navbar";
import Splash from "./components/Splash";
import Hero from "./components/Hero";
import About from "./components/About";
import ImpactStats from "./components/ImpactStats";
import Programs from "./components/Programs";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Splash />
      <Navbar />
      <Hero />
      <About />
      <ImpactStats />
      <Programs />
      <Projects />
      <Footer />
    </main>
  );
}

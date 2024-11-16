import Amigurumi from "@/components/Amigurumi";
import Hero from "@/components/Hero";
import Mintak from "@/components/Mintak";
import Welcome from "@/components/Welcome";

export default async function Home() {
  // Simulate loading delay for demonstration (2 seconds)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div>
      <Hero />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <Welcome />
        <Amigurumi />
        <Mintak />
      </div>
    </div>
  );
}

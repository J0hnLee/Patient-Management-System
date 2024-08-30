import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="text-white text-4xl underline">
      Home
      <div>
        <Button>Click me</Button>
      </div>
    </div>
  );
}

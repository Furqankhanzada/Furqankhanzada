import Header from "@/components/header";
import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container max-w-screen-2xl">
        <div className="h-[800px] mt-36">
          <div className="max-w-3xl ml-2">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl">
              Hey 👋 <br />
              I&apos;am Muhammad Furqan
            </h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6 text-xl text-muted-foreground">
              I am a full-stack developer with extensive experience in building mobile and web applications from concept to deployment.
            </p>
            <div className="mt-5">
              <Button variant="ghost" size="icon" asChild>
                <Link href='https://github.com/Furqankhanzada' target="_blank">
                  <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href='https://www.linkedin.com/in/muhammad-furqan-khanzada' target="_blank">
                  <LinkedInLogoIcon className="h-[1.2rem] w-[1.2rem]" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href='https://x.com/Furqankhanzada1' target="_blank">
                  <TwitterLogoIcon className="h-[1.2rem] w-[1.2rem]" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>

  );
}

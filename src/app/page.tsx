import { CreateVideoButton } from "@/features/create-video/components/CreateVideoButton";
import { VideosList } from "@/lib/ui/components/VideosList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 p-2">
      <article className="text-center w-full lg:w-[60vw]">
        <h1 className="text-[32px] font-bold">Your videos</h1>
        <div className="mb-4 w-full">
          <VideosList />
        </div>
        <CreateVideoButton />
      </article>
    </main>
  );
}

import { CreateVideoButton } from "@/features/create-video/components/CreateVideoButton";
import { VideosList } from "@/lib/ui/components/VideosList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 p-24">
      <article className="prose text-center w-full">
        <h1 className="">Your videos</h1>
        <div className="mb-4">
          <VideosList />
        </div>
        <CreateVideoButton />
      </article>
    </main>
  );
}

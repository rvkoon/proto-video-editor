import { CreateVideoButton } from "@/features/create-video/components/CreateVideoButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Your videos</h1>
      <CreateVideoButton />
    </main>
  );
}

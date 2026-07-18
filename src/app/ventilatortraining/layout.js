import VentilatorTrainingSidebar from "@/components/template/ventilatortraining";

export default function VentilatorTrainingLayout({ children }) {
  return (
    <main className="max-w-7xl my-10 flex flex-col-reverse lg:flex-row gap-6">
      <VentilatorTrainingSidebar />

      <section className="flex-1">{children}</section>
    </main>
  );
}

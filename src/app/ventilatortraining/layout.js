import VentilatorTrainingSidebar from "@/components/template/ventilatortraining";

export default function VentilatorTrainingLayout({ children }) {
  return (
    <main dir="rtl" className="min-h-screen bg-slate-50">
      <div
        className="
        mx-auto
        max-w-7xl
        px-4
        py-8
        flex
        flex-col
        gap-6
        lg:flex-row
      "
      >
        {/* Sidebar */}

        <aside
          className="
          lg:w-80
          shrink-0
        "
        >
          <VentilatorTrainingSidebar />
        </aside>

        {/* Content */}

        <section
          className="
          flex-1
          rounded-3xl
          bg-white
          shadow-sm
          border
          p-6
          min-h-[700px]
        "
        >
          {children}
        </section>
      </div>
    </main>
  );
}

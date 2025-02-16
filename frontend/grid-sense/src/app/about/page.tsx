"use client";
import Sidebar from "../components/sidebar/Sidebar";

export default function About() {
  return (
    <main className={`flex flex-col mt-[10rem] justify-start`}>
      <Sidebar />
      <div className={`flex flex-col items-center`}>
        <div className={`text-6xl cursor-default w-[100vw] text-center`}>
          About
        </div>
        <p className="py-4 w-[80vw] text-center">
          <p className="pb-4">
            At <span className="gs-color-tertiary">ThermaSense</span>, we are
            committed to ensuring that no family is left in the cold.
          </p>
          <p className="pb-4">
            Rising heating oil costs and supply chain challenges
            disproportionately impact low-income households, forcing many to
            ration heat and face serious health risks.{" "}
          </p>
          <p className="pb-4">
            Our AI-driven forecasting platform leverages historical data,
            climate patterns, and machine learning to predict heating oil
            demand, optimize supply distribution, and reduce costs for both
            consumers and utility providers. By providing real-time insights and
            predictive analytics, we help prevent shortages, lower heating
            expenses, and enhance grid efficiency.
          </p>
          <p className="pb-4">
            Through innovation and data-driven solutions,{" "}
            <span className="gs-color-tertiary">ThermaSense</span> is working
            toward a future where everyone has access to reliable and affordable
            heating—no matter their income or location.
          </p>
        </p>
      </div>
    </main>
  );
}

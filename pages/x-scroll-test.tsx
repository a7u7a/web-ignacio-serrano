import TestItem from "../components/test-item";

const XScrollTest = () => {
  return (
    <div className="w-screen h-full">
      <div className="flex shrink-0 snap-x mx-auto snap-mandatory overflow-scroll">
        <TestItem src="/uploads/screen-shot-2021-12-24-at-16.32.48.png" />
        <TestItem src="/uploads/screen-shot-2022-05-25-at-20.31.07.png" />
        <TestItem src="/uploads/screen-shot-2021-12-24-at-16.32.48.png" />
        <TestItem src="/uploads/screen-shot-2022-05-05-at-15.55.04.png" />
      </div>
    </div>
  );
};

export default XScrollTest;

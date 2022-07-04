import TestItem from "../components/css-test-item";

function createArray(len:number) {
  const out = [];
  for (let i = 0; i < len; i++) {
    out.push(i);
  }
  return out;
}

const CSSTest = () => {

  const someArray = createArray(9)

  return (
    <div className="grid grid-flow-col auto-cols-min grid-rows-4 w-1/2">
      
      <TestItem />
      <TestItem />
      <TestItem className="row-span-3" />
      <TestItem />
      <TestItem />
      <TestItem />
      <TestItem />
      <TestItem />
      <TestItem />
    </div>
  );
};

export default CSSTest;

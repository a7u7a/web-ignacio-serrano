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
    <div className="grid grid-flow-col auto-cols-min grid-rows-4 h-screen w-screen">
      <TestItem label={1} />
      <TestItem label={2} />
      <TestItem className="row-span-2" label={3}/>
      <TestItem label={4}/>
      <TestItem label={5}/>
      <TestItem label={6}/>
      <TestItem label={7}/>
      <TestItem label={8}/>
      <TestItem label={9}/>
    </div>
  );
};

export default CSSTest;

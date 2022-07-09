
// wip

interface BlockquoteProps {
  node: any; // fix
}

interface ChildProps {
  value: string;
}

const Blockquote = ({ node, ...props }: BlockquoteProps) => {
  if (node.properties && node.properties.id === "textOnImage") {
    const text = (node.children[0] as ChildProps).value;
    const src = node.properties.src as string;
    const alt = node.properties.alt as string;
    return (
      <div className="w-full relative">
        <img alt={alt} src={src} className="w-full object-contain" />
        <div className="absolute w-full h-full top-0 left-0 p-4 overflow-auto">
          <span className="text-white leading-snug text-base inline py-0.5 px-0.5 bg-black">
            {text}
          </span>
        </div>
      </div>
    );
  } else {
    return <blockquote {...props} />;
  }
};


export default Blockquote
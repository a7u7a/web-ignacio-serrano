interface CategoryTagProps {
  label: string;
}

const CategoryTag = ({ label }: CategoryTagProps) => {
  return (
    <div className="text-xs sm:text-xs md:text-sm max-w-min px-1 rounded font-bold text-zinc-100 mt-1 md:mt-2 bg-zinc-800">
      {label}
    </div>
  );
};
export default CategoryTag;

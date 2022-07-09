import { parse, format } from "date-fns";

export default function DateEl({
  dateString,
  className,
}: {
  dateString: string;
  className?: string;
}) {
  const date = Date.parse(dateString);
  return date ? (
    <time className={className} dateTime={dateString}>
      {format(date, "LLL d, yyyy")}
    </time>
  ) : (
    <></>
  );
}

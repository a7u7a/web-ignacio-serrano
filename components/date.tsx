import { parse, format } from 'date-fns'

export default function DateEl({ dateString }:{ dateString: string }) {
  const date = Date.parse(dateString)
  return <time className='text-sm' dateTime={dateString}>{format(date, 'LLL d, yyyy')}</time>
}
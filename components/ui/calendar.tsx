import * as React from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

export const Calendar = React.forwardRef(function Calendar(
  props: React.ComponentProps<typeof DayPicker>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div ref={ref} className="p-3">
      <DayPicker {...props} />
    </div>
  )
})

"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/components/ui/button"
import { Calendar } from "@/shared/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover"

interface DatePickerProps {
  /** Nilai tanggal dalam format "yyyy-MM-dd" (cocok dengan <input type="date"> lama). */
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

/**
 * Date picker level-hari, pengganti <input type="date"> biasa.
 * Dipakai misalnya di form tambah/edit event Calendar.
 */
export function DatePicker({ value, onChange, placeholder = "Pilih tanggal", className }: DatePickerProps) {
  const selected = value ? new Date(`${value}T00:00:00`) : undefined

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal h-11 rounded-lg border-gray-300 dark:border-gray-700",
              !value && "text-gray-400",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected ? format(selected, "dd MMM yyyy") : placeholder}
          </Button>
        }
      />
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(date) => date && onChange(format(date, "yyyy-MM-dd"))}
        />
      </PopoverContent>
    </Popover>
  )
}
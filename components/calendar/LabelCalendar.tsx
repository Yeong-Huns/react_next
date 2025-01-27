'use client'

import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";
import {cn} from "@/lib/utils";

interface Props {
    label: string;
    readonly?: boolean;
}

export const LabelCalendar = ({label, readonly}: Props) => {
    const [date, setDate] = useState<Date>();

    return <div className={'flex items-center gap-3'}>
        <span className={'text-gray-600'}>{label}</span>
        {/*Shadcn UI*/}
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[200px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            {!readonly && (
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                    />
                </PopoverContent>
            )}
        </Popover>
    </div>
}
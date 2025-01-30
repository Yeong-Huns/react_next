'use client'

import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {ChevronUp} from "lucide-react";
import {LabelCalendar} from "@/components/calendar/LabelCalendar";
import {MarkdownDialog} from "@/components/dialog/MarkdownDialog";
import {BoardContent} from "@/app/create/[id]/page";
import {useState} from "react";

type Props = {
    data : BoardContent;
}

export const BasicBoard = ({ data } : Props) => {
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(new Date());


    return <div className={'flex flex-col items-center w-full p-5 bg-white rounded-md shadow-lg  gap-4'}>
        <div className={'flex items-center justify-between w-full'}>{/*헤더*/}
            <div className={'flex items-center flex-1 gap-2'}>{/*타이틀박스*/}
                <Checkbox className={'w-5 h-5'}/>
                <span className={'w-full font-semibold text-2xl text-gray-500 placeholder:font-semibold placeholder-gray-300'}>게시글 제목을 입력해주세요.</span>
            </div>
            <Button variant={'ghost'}>
                <ChevronUp className={'w-5 h-5 text-gray-400'}/>
            </Button>
        </div>
        <div className={'flex items-center justify-between w-full ml-6 mr-3'}>{/*바디*/}
            <div className={'flex items-center gap-4'}>{/*바디_캘린더박스*/}
                <LabelCalendar label={'From'} />
                <LabelCalendar label={'To'} />
            </div>
            <div>{/*바디_버튼박스*/}
                <Button variant={'ghost'} className={'font-normal text-gray-400 hover:bg-green-50 hover:text-green-500'}>
                    복사
                </Button>
                <Button variant={'ghost'} className={'font-normal text-gray-400 hover:bg-red-50 hover:text-red-500'}>
                    제거
                </Button>
            </div>
        </div>
        <div className={'flex items-center justify-center w-full pt-3 border-t border-gray-300'}>{/*푸터*/}
            <MarkdownDialog data={data}/>
        </div>
    </div>
}
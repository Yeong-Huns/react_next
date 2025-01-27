"use client"

import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {LabelCalendar} from "@/components/calendar/LabelCalendar";
import {Separator} from "@/components/ui/separator";
import MDEditor from "@uiw/react-md-editor";
import {useState} from "react";

export const MarkdownDialog = () => {
    const [contents, setContents] = useState<string | undefined>("**마크다운 문법을 지원합니다!**");

    return <Dialog>
        <DialogTrigger asChild>
            <Button variant={'ghost'} className={'font-normal text-gray-400 hover:text-gray-500 cursor-pointer'}>추가</Button>
        </DialogTrigger>
        <DialogContent className={'max-w-fit'}>
            <DialogHeader>
                <DialogTitle>
                    <div className={'flex items-center justify-start w-[45vw] gap-2'}>{/*타이틀박스*/}
                        <Checkbox className={'w-5 h-5'}/>
                        <input type={'text'} placeholder={'내용을 입력해주세요.'}
                               className={'w-full outline-none border-none font-medium text-2xl text-gray-600 placeholder:font-medium placeholder-gray-400'}/>
                    </div>
                </DialogTitle>
                <DialogDescription/>
                <div className={'flex items-center w-[45vw] gap-4 pt-4'}>{/*캘린더박스*/}
                    <LabelCalendar label={'From'}/>
                    <LabelCalendar label={'To'}/>
                </div>
                <Separator/>
                <div className={'w-[45vw] h-[45vh]'} data-color-mode="light">{/*마크다운*/}
                    <MDEditor value={contents} onChange={setContents} height={`${100}%`}/>
                </div>
            </DialogHeader>
            <DialogFooter>
                <div className={'flex items-center justify-end w-[45vw] gap-4 pt-3'}>{/*버튼박스*/}
                    <DialogClose asChild>
                        <Button variant={'ghost'}
                                className={'font-normal text-gray-400 hover:bg-gray-50 hover:text-gray-500'}>취소</Button>
                    </DialogClose>
                    <Button type={'submit'}
                            className={'font-normal border-orange-500 bg-orange-400 text-white hover:bg-orange-400 hover:text-white'}>
                        작성
                    </Button>
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>

}
"use client"

import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {LabelCalendar} from "@/components/calendar/LabelCalendar";
import {Separator} from "@/components/ui/separator";
import MDEditor from "@uiw/react-md-editor";
import {ChangeEvent, useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {supabase} from "@/utils/supabase";

export const MarkdownDialog = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [contents, setContents] = useState<string | undefined>("**마크다운 문법을 지원합니다!**");
    const { toast } = useToast()
    const [title, setTitle] = useState<string>("")

    /*
    *
    * */
    const onSubmit = async () => {
        console.log("onSubmit")
        if(!title || !contents) {
            toast({
                title: "입력되지 않은 필수 요소가 존재합니다.",
                description: "제목, 날짜, 콘텐츠 내용을 모두 입력해주세요.",
            });
            return;
        } else {
            // SUPABASE 연동
            const { data, error, status } = await supabase
                .from('todos')
                .insert([
                    { title: title, content: contents },
                ])
                .select()
            if(error){
                console.log(error)
                toast({
                    title: "저장에 실패하였습니다.",
                    description: "데이터 저장중 서버 오류가 발생했습니다."
                })
            }
            if(status === 201){
                toast({
                    title: "저장 완료",
                    description: "성공적으로 저장되었습니다!"
                })

                // 추가 초기화 로직
                setOpen(false);
            }
        }
    }

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant={'ghost'} className={'font-normal text-gray-400 hover:text-gray-500 cursor-pointer'}>추가</Button>
        </DialogTrigger>
        <DialogContent className={'max-w-fit'}>
            <DialogHeader>
                <DialogTitle>
                    <div className={'flex items-center justify-start w-[45vw] gap-2'}>{/*타이틀박스*/}
                        <Checkbox className={'w-5 h-5'}/>
                        <input type={'text'} placeholder={'내용을 입력해주세요.'}
                               onChange={(event:ChangeEvent<HTMLInputElement>)=> setTitle(event.target.value)}
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
                            onClick={onSubmit}
                            className={'font-normal border-orange-500 bg-orange-400 text-white hover:bg-orange-400 hover:text-white'}>
                        작성
                    </Button>
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>

}
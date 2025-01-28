'use client'

import {Progress} from "@/components/ui/progress";
import {Button} from "@/components/ui/button";
import {LabelCalendar} from "@/components/calendar/LabelCalendar";
import {BasicBoard} from "@/components/board/BasicBoard";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {supabase} from "@/utils/supabase";
import Image from "next/image";
import {nanoid} from "nanoid";

export interface Todo {
    id: number;
    title: string;
    start_date: string | Date;
    end_date: string | Date;
    contents: BoardContent[];
}

export interface BoardContent {
    boardId: string | number;
    isCompleted: boolean;
    title: string;
    start_date: Date | string;
    end_date: Date | string;
    content: string;
}

export default function Page() {
    const router = useRouter();
    const pathname = usePathname();
    const [board, setBoard] = useState<Todo>();
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(new Date());
    const {toast} = useToast();

    const insertRowData = async (contents: BoardContent[]) => {

        const {error, status} = await supabase.from('todos').update({
            contents: contents,
        }).eq("id", pathname.split("/")[2]);

        if (error) {
            console.log(error)
            toast({
                title: "에러 발생",
                description: "ToDoList 추가중 에러가 발생했습니다."
            })
        }
        if (status === 204) {
            toast({
                title: "생성 완료",
                description: "새로운 ToDoList 가 추가되었습니다."
            })
            getData()
        }

    }

    const createBoard = () => {
        let newContents: BoardContent[] = [];
        const BoardContents: BoardContent = {
            boardId: nanoid(),
            isCompleted: false,
            title: "",
            start_date: "",
            end_date: "",
            content: "",
        };
        if (board && board.contents.length > 0) {
            newContents = [...board.contents];
            newContents.push(BoardContents);
            insertRowData(newContents);
        } else if (board && board.contents.length === 0) {
            newContents.push(BoardContents);
            insertRowData(newContents);
        }
    }

    const getData = async () => {
        const {data} = await supabase.from("todos").select("*");
        console.log(data);
        if (data !== null) {
            data.forEach((item: Todo) => {
                if (item.id === Number(pathname.split("/")[2])) {
                    setBoard(item);
                }
            })
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return <div className={'flex flex-col items-center justify-start w-[920px] h-screen bg-gray-50 border-r border-gray-200'}>
        <header className={'flex flex-col items-center justify-end w-full bg-white'}>
            <div className={'flex flex-col w-full py-5 px-7 mt-[68px] gap-4'}>
                <input type={'text'} placeholder={'제목을 입력하세요.'} className={'text-4xl font-bold outline-none placeholder:text-gray-300'}/>
                <div className={'flex items-center justify-start gap-4'}>
                    <span className={'text-gray-500'}>0/10 complete</span>
                    {/*프로그래스바 UI*/}
                    <Progress value={33} className={'w-[30%] h-2'} indicatorColor={'bg-green-500'}/>
                </div>
                <div className={'flex items-center justify-between'}>
                    <div className={'flex items-center gap-5'}>
                        {/*캘린더 UI*/}
                        <LabelCalendar label={'From'} readonly={true}/>
                        <LabelCalendar label={'To'} readonly={true}/>
                    </div>
                    <Button variant={'outline'}
                            onClick={createBoard}
                            className={'w-[15%] border-orange-500 bg-orange-400 text-white hover:bg-orange-400 hover:text-white'}>
                        Add New Board
                    </Button>
                </div>
            </div>
        </header>
        <main className={'flex items-start justify-center w-full h-[70%] py-7 px-4 overflow-y-scroll'}>
            {board?.contents.length === 0 ? (
                <div className={'flex items-center justify-center w-full h-full'}>
                    <div className={'flex flex-col items-center justify-center gap-4'}>
                        <span className={'text-2xl font-bold text-gray-600'}>아직 생성된 게시물이 없습니다.</span>
                        <span className={'ml-3 mr-7 text-xl text-gray-600'}>버튼을 눌러서 실행</span>
                        <button className={'flex items-center justify-center w-[74px] h-[74px] outline-none border-none cursor-pointer'}>
                            <Image src={'/assets/images/button.svg'} alt={'round-button'} width={100} height={100}/>
                        </button>
                    </div>
                </div>
            ) : (
                <div className={"flex flex-col items-center justify-start w-full h-full gap-4"}>
                    {board?.contents.map((board: BoardContent) => {
                        return <BasicBoard key={board.boardId}/>
                    })}
                </div>
            )}
        </main>
    </div>

}
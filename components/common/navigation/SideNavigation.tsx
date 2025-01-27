'use client'

import {Button} from "@/components/ui/button";
import {Dot, Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import {supabase} from "@/utils/supabase";
import {toast} from "@/hooks/use-toast";
import {useEffect, useState} from "react";

type Todo = {
    title: string;
    start_date: Date;
    end_date: Date;
    content: [];
}

export const SideNavigation = () => {
    const router = useRouter();
    const [todos, setTodos] = useState<any>([]);

    const onCreate = async () => {
        console.log('onCreate');

        const {error, status} = await supabase.from('todos').insert([
            {
                title: "",
                start_date: new Date(),
                end_date: new Date(),
                contents: []
            },
        ]).select()

        if (error) {
            console.log('error', error);
        }

        const { data } = await supabase.from('todos').select();

        if (status === 201) {
            toast({
                title: "생성 완료",
                description: "새로운 TodoList 생성에 성공하였습니다."
            })

            if(data) router.push(`/create/${data[data?.length - 1].id}`);
            else return
        }
    }

    const getTodos = async () => {
        const {data, error, status} = await supabase.from('todos').select('*');

        if(error) {
            console.log('error', error);
        }

        if (status === 200) {
            setTodos(data);
        }
    }

    useEffect(() => {
        getTodos();
    }, [])

    return <div className={'flex flex-col w-[280px] h-screen py-5 px-6 border-x border-gray-200 gap-1'}>
        <div className={'flex items-center justify-start gap-1'}>
            <Input type={'text'} placeholder={'검색어를 입력해주세요'} className={'focus-visible:ring-0'}/>
            <Button variant={'outline'} size={"icon"}>
                <Search className={'w-4 h-4'}/>
            </Button>
        </div>
        <div className={'flex items-center justify-center w-full my-3'}>
            <Button variant={"outline"}
                    onClick={onCreate}
                    className={'w-full text-orange-500 border-orange-400 hover:bg-orange-50 hover:text-orange-500'}>Add New Page</Button>
        </div>
        <div className={'flex flex-col w-full'}>
            <span className={'my-2 font-medium text-sm text-gray-400'}>나의 할 일</span>
            {/*TodoList*/}
            <div className={'flex flex-col gap-2'}>
            {todos &&
                todos.map((item: any) => {
                    return (
                        <div className={'flex items-center py-2 bg-gray-100 rounded-sm cursor-pointer'} key={item.id}>
                            <Dot className={'mr-1 text-green-500'}></Dot>
                            <span className={'text-sm'}>{item.title === "" ? "제목 없음" : item.title}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
}
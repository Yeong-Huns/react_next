import {Button} from "@/components/ui/button";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";

export const SideNavigation = () => {
    return <div className={'flex flex-col w-[280px] h-screen py-5 px-6 border-x border-gray-200 gap-1'}>
        {/*검색창*/}
        <div className={'flex items-center justify-start'}>{/*컨테이너 _검색창*/}
            <Input type={'text'} placeholder={'검색어를 입력해주세요'} className={'focus-visible:ring-0'}/>
            <Button variant={'outline'} size={"icon"}>
                <Search className={'w-4 h-4'}/>
            </Button>
        </div>
        <div className={'flex items-center justify-center w-full my-3'}>
            <Button variant={"outline"} className={'w-full text-orange-500 border-orange-400 hover:bg-orange-50 hover:text-orange-500'}>Add New Page</Button>
        </div>
        <div className={'flex flex-col w-full'}>
            <span className={'my-2 font-medium text-sm text-gray-400'}>나의 할 일</span>
        </div>
    </div>
}
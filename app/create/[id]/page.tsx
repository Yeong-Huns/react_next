import {Progress} from "@/components/ui/progress";
import {Button} from "@/components/ui/button";
import {LabelCalendar} from "@/components/calendar/LabelCalendar";
import {BasicBoard} from "@/components/board/BasicBoard";

export default function page(){
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
                    <Button variant={'outline'} className={'w-[15%] border-orange-500 bg-orange-400 text-white hover:bg-orange-400 hover:text-white'}>
                        Add New Board
                    </Button>
                </div>
            </div>
        </header>
        <main className={'flex items-start justify-center w-full h-[70%] py-7 px-4'}>
            {/*<div className={'flex flex-col items-center justify-center gap-4'}>
                <span className={'text-2xl font-bold text-gray-600'}>아직 생성된 게시물이 없습니다.</span>
                <span className={'ml-3 mr-7 text-xl text-gray-600'}>버튼을 눌러서 실행</span>
                <button className={'flex items-center justify-center w-[74px] h-[74px] outline-none border-none cursor-pointer'}>
                    <Image src={'assets/images/button.svg'} alt={'round-button'} width={100} height={100}/>
                </button>
            </div>*/}
            <BasicBoard/>
        </main>
    </div>

}
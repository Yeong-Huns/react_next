'use client'
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {supabase} from "@/utils/supabase";
import {toast} from "@/hooks/use-toast";

const Home = () => {
    const router = useRouter();

    const onCreate = async () => {
        const { error, status } = await supabase.from('todos').insert([
            {
                title: "",
                start_date: new Date(),
                end_date: new Date(),
                contents: [],
            }
        ])
            .select();
        if (error) {
            console.error(error);
        }

        const { data } = await supabase.from('todos').select();

        if(status===201){
            toast({
                title: "생성 완료",
                description: "새로운 TodoList 생성에 성공하였습니다."
            })

            if (data) router.push(`/create/${data[data?.length - 1].id}`);
            else return;
        }
    }

    return <div className={'flex items-center justify-center w-[920px] h-screen bg-gray-100 border-r border-gray-300'}>
        <div className={'flex flex-col items-center justify-center w-[182px] gap-5'}>
      <span className={'text-3xl font-bold text-gray-600 w-[200px]'}>온보딩 타이틀
        <div className={'flex flex-col items-center justify-center gap-2 text-lg text-gray-600'}>온보딩_스텝
          <span>1. Create a page</span>
          <span>2. Add boards to page</span>
        </div>
          {/*페이지 추가 버튼*/}
          <Button variant={'outline'}
                  onClick={onCreate}
                  className={'w-full bg-transparent text-orange-500 border-orange-400 hover:bg-orange-50 hover:text-orange-500'}>Add new Button</Button>
      </span>
        </div>
    </div>
}

export default Home;
import { Input } from "@/components/input";
import BasicSelect from "@/components/select";

export default function CreatePage() {
    return (
        <main className="pt-16 h-full flex justify-center">
            <div >
                <h2 className="font-mono font-bold text-center text-xl pb-12">Create post</h2>
                <form className="flex flex-col gap-4">
                    <Input type="text" label="title" name="title" required />
                    <BasicSelect />
                </form>
            </div>
        </main>
    )
}
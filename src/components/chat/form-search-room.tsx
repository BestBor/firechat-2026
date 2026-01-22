import { emailFriendZodSchema, type EmailFriendZodSchema } from "@/lib/zod.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useTransition } from "react"
import { useRoomActions } from "@/hooks/use-room-actions"
import { toast } from "sonner"


interface Props {
    handleClickRoomId: (id: string) => void
}

const FormSearchRoom = ({handleClickRoomId}: Props) => {

    const [isLoading, startTransition] = useTransition()
    const { findOrCreateRoom } = useRoomActions()

    const form = useForm<EmailFriendZodSchema>({
        resolver: zodResolver(emailFriendZodSchema),
        defaultValues: {
            email: "",
        },
    })

    function onSubmit(values: EmailFriendZodSchema) {
        startTransition(async () => {
            const response = await findOrCreateRoom(values.email)
            if (response.success) {
                handleClickRoomId(response.roomId)
                toast.success("Room found, start chatting!")
                form.reset()
                return
            }
            toast.error(response.message)
        })
    }

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
            control={form.control}
            name="email"
            render={({field}) => (
                <FormItem>
                    <FormControl>
                        <Input placeholder="yourfriendmail@mail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit" variant={"outline"} className="w-full" disabled={isLoading}>
            {
                isLoading ? "Searching friend room...": "Find"
            }
        </Button>
    </form>
  </Form> 
}
export default FormSearchRoom
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation";


const NoteCard = ({ id, title, content }: { id: string; title: string; content: string }) => {
    const router = useRouter()
    return (
        <Card onClick={() => router.push(`/notes/${id}`)} className="cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in-out">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{content}</CardDescription>
            </CardHeader>

        </Card>
    )
}

export default NoteCard

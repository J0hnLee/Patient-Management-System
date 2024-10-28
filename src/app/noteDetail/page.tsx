"use client"

import { useNotesStore } from "@/hooks/useNotesStore";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function NoteDetail() {
    const { notes } = useNotesStore()
    console.log(notes)
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">筆記詳情</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notes.map((note, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>筆記 #{index + 1}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="whitespace-pre-wrap">{note}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

"use client"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNotesStore } from "@/hooks/useNotesStore";
import Link from 'next/link'

export default function Customers() {
    const { notes, addNote, updateNote, deleteNote } = useNotesStore()

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">筆記應用</h1>
            <Button onClick={addNote} className="mb-4">
                添加新筆記
            </Button>
            
            <div className="space-y-4">
                {notes.map((note, index) => (
                    <div key={index} className='flex flex-row'>
                        <div className="flex flex-row justify-between relative w-full">
                            <Textarea
                                value={note}
                                onChange={(e) => updateNote(index, e.target.value)}
                                placeholder={`筆記 #${index + 1}`}
                                className="w-full pr-12"
                            />
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute bottom-2 right-2"
                                onClick={() => deleteNote(index)}
                            >
                                刪除
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <Link href="/">
          <Button variant="outline">
            返回
          </Button>
        </Link>
        </div>
    );
}

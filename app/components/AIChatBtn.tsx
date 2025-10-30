"use client";
import { Button } from '@/components/ui/button'
import { Bot } from 'lucide-react'
import { useState } from 'react'
import AIChatBox from './AIChatBox';

const AIChatBtn = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
      <Button
        className="flex gap-2 items-center justify-center bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
        onClick={() => setIsOpen(true)}
      >
        <Bot size={18} />
        Ask AI
      </Button>

      {isOpen && <AIChatBox open={isOpen} onClose={() => setIsOpen(false)} />}
    </div>

    )
}

export default AIChatBtn

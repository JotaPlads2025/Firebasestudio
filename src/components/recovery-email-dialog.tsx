
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Send, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  generateRecoveryEmail,
  type GenerateRecoveryEmailOutput,
} from '@/ai/flows/generate-recovery-email';

interface RecoveryEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  lastClass: string;
}

export default function RecoveryEmailDialog({
  open,
  onOpenOpenChange,
  studentName,
  lastClass,
}: RecoveryEmailDialogProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [emailContent, setEmailContent] =
    useState<GenerateRecoveryEmailOutput | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      setEmailContent(null);
      generateRecoveryEmail({ studentName, lastClass })
        .then(setEmailContent)
        .catch((error) => {
          console.error('Error generating email:', error);
          toast({
            variant: 'destructive',
            title: 'Error al generar el correo',
            description:
              'Hubo un problema con la IA. Por favor, intenta de nuevo.',
          });
          onOpenChange(false);
        })
        .finally(() => setIsLoading(false));
    }
  }, [open, studentName, lastClass, toast, onOpenChange]);

  const handleSendEmail = () => {
    setIsSending(true);
    // Simulate sending email
    setTimeout(() => {
      setIsSending(false);
      toast({
        title: '¡Correo enviado!',
        description: `El correo de recuperación para ${studentName} ha sido enviado.`,
      });
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Contactar a {studentName}
          </DialogTitle>
          <DialogDescription>
            La IA ha generado un borrador para que lo revises y envíes. Puedes
            editar el texto antes de enviarlo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-48 rounded-lg border border-dashed">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid gap-4">
              <div>
                <Label htmlFor="subject">Asunto</Label>
                <Textarea
                  id="subject"
                  value={emailContent?.subject || ''}
                  onChange={(e) =>
                    setEmailContent((prev) =>
                      prev ? { ...prev, subject: e.target.value } : null
                    )
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="body">Cuerpo del Correo</Label>
                <Textarea
                  id="body"
                  value={emailContent?.body || ''}
                  onChange={(e) =>
                    setEmailContent((prev) =>
                      prev ? { ...prev, body: e.target.value } : null
                    )
                  }
                  className="mt-1 min-h-[200px]"
                  rows={10}
                />
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSending}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSendEmail}
            disabled={isLoading || isSending}
          >
            {isSending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Enviar Correo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


'use client';

import CreateClassForm from "@/components/create-class-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewClassPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Volver</span>
                </Button>
                <h1 className="font-headline text-3xl font-semibold">Crear Nueva Clase</h1>
            </div>

            <Card className="max-w-4xl mx-auto w-full">
                <CardHeader>
                    <CardTitle>Detalles de la Clase</CardTitle>
                    <CardDescription>
                        Completa la información a continuación para crear tu nueva clase.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CreateClassForm />
                </CardContent>
            </Card>
        </div>
    )
}

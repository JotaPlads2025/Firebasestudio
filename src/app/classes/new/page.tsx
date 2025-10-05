import CreateClassForm from "@/components/create-class-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewClassPage() {

    return (
        <div className="flex flex-col gap-8">
            <h1 className="font-headline text-3xl font-semibold">Crear Nueva Clase</h1>

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
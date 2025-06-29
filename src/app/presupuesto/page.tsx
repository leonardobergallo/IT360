"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const servicios = [
  "Soporte Técnico",
  "Instalación de Red",
  "Desarrollo Web",
  "Venta de Equipos",
  "Otro",
];

export default function PresupuestoPage() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [servicio, setServicio] = useState(servicios[0]);
  const [descripcion, setDescripcion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/presupuesto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, telefono, servicio, descripcion }),
      });
      if (!res.ok) throw new Error("Error al enviar el presupuesto");
      toast.success("¡Solicitud enviada! Te contactaremos pronto.");
      setNombre("");
      setEmail("");
      setTelefono("");
      setServicio(servicios[0]);
      setDescripcion("");
    } catch {
      toast.error("No se pudo enviar la solicitud. Intenta más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto mt-12">
      <CardHeader>
        <CardTitle>Solicitar Presupuesto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Nombre</Label>
            <Input value={nombre} onChange={e => setNombre(e.target.value)} required />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label>Teléfono</Label>
            <Input value={telefono} onChange={e => setTelefono(e.target.value)} />
          </div>
          <div>
            <Label>Servicio</Label>
            <select className="w-full border rounded px-3 py-2" value={servicio} onChange={e => setServicio(e.target.value)}>
              {servicios.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <Label>Descripción</Label>
            <Textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} required placeholder="Contanos tu necesidad..." />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Solicitar Presupuesto"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 
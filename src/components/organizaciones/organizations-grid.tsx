"use client";

import { useEffect, useState } from "react";
import { Building, FileText, MoreVertical, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useEliminarOrganizacion } from "./BotonEliminar";

export function OrganizationsGrid() {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargar() {
      try {
        const res = await fetch("/api/organizacion");
        if (!res.ok) throw new Error("Error cargando organizaciones");

        const data = await res.json();
        setOrganizations(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    cargar();
  }, []);

  if (loading) return <p className="text-center">Cargando organizaciones...</p>;
  const eliminar = useEliminarOrganizacion();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {organizations.map((org) => (
        <Card key={org.idOrganizacion}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Building className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">{org.nombre}</CardTitle>
                  <CardDescription className="text-xs">
                    {org.descripcion || "Sin descripción"}
                  </CardDescription>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                  <DropdownMenuItem>Editar</DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={async () => {
                      const ok = await eliminar(org.idOrganizacion);
                      if (ok) {
                        setOrganizations((prev) =>
                          prev.filter(
                            (o) => o.idOrganizacion !== org.idOrganizacion
                          )
                        );
                      }
                    }}
                  >
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>Documentos</span>
              </div>
              <span className="font-medium">0</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Miembros</span>
              </div>
              <span className="font-medium">0</span>
            </div>

            <div className="pt-2">
              <Badge variant="default">Activa</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

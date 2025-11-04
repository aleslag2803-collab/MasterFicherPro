"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const documentsByType = [
  { name: "Contratos", value: 450 },
  { name: "Informes", value: 320 },
  { name: "Políticas", value: 180 },
  { name: "Manuales", value: 120 },
]

const documentsByStatus = [
  { name: "Activos", value: 65 },
  { name: "Revisión", value: 45 },
  { name: "Archivados", value: 30 },
  { name: "Borrador", value: 20 },
]

export function DocumentCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Documentos Por Tipo</CardTitle>
          <p className="text-sm text-muted-foreground">Distribución de documentos según su categoría</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={documentsByType}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} />
              <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Documentos Por Estado</CardTitle>
          <p className="text-sm text-muted-foreground">Estado actual de los documentos en el sistema</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={documentsByStatus} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={{ stroke: "#e5e7eb" }}
                width={80}
              />
              <Bar dataKey="value" fill="#1e293b" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

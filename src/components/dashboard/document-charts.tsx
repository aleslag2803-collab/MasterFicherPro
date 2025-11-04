"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const documentsByType = [
  { type: "Contratos", count: 450 },
  { type: "Informes", count: 320 },
  { type: "Políticas", count: 180 },
  { type: "Manuales", count: 150 },
  { type: "Otros", count: 134 },
]

const documentsByStatus = [
  { status: "Activo", count: 850, fill: "hsl(var(--chart-1))" },
  { status: "Revisión", count: 234, fill: "hsl(var(--chart-2))" },
  { status: "Borrador", count: 150, fill: "hsl(var(--chart-3))" },
]

export function DocumentCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Documentos por Tipo</CardTitle>
          <CardDescription>Distribución de documentos según su categoría</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: {
                label: "Cantidad",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={documentsByType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documentos por Estado</CardTitle>
          <CardDescription>Estado actual de los documentos en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: {
                label: "Cantidad",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie data={documentsByStatus} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={100}>
                  {documentsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

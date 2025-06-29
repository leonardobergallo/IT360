"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Papa from "papaparse";

export default function ImportProductsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [markup, setMarkup] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [preview, setPreview] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setProducts([]);
    setPreview([]);
    setError("");
  };

  const handleParse = () => {
    if (!file) return;
    setLoading(true);
    setError("");
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        let data = results.data as any[];
        // Aplicar markup
        if (markup > 0) {
          data = data.map((row) => ({
            ...row,
            price: row.price ? (parseFloat(row.price) * (1 + markup / 100)).toFixed(2) : row.price,
          }));
        }
        setProducts(data);
        setPreview(data.slice(0, 5));
        setLoading(false);
      },
      error: (err) => {
        setError("Error al procesar el archivo: " + err.message);
        setLoading(false);
      },
    });
  };

  const handleSubmit = async () => {
    if (!products.length) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/import-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products }),
      });
      if (!res.ok) throw new Error("Error al importar productos");
      alert("¡Productos importados correctamente!");
      setFile(null);
      setProducts([]);
      setPreview([]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Importar Productos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Archivo CSV</Label>
          <Input type="file" accept=".csv" onChange={handleFileChange} />
        </div>
        <div className="space-y-2">
          <Label>Markup (%)</Label>
          <Input
            type="number"
            min={0}
            value={markup}
            onChange={(e) => setMarkup(Number(e.target.value))}
            placeholder="Porcentaje de ganancia"
          />
        </div>
        <Button type="button" onClick={handleParse} disabled={!file || loading}>
          Previsualizar
        </Button>
        {error && <div className="text-red-600">{error}</div>}
        {preview.length > 0 && (
          <div>
            <h3 className="font-bold mb-2">Vista previa (primeros 5 productos):</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr>
                    {Object.keys(preview[0]).map((key) => (
                      <th key={key} className="border px-2 py-1 bg-gray-100">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).map((val, j) => (
                        <td key={j} className="border px-2 py-1">{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button type="button" className="mt-4" onClick={handleSubmit} disabled={loading}>
              Importar productos
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 
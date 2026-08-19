"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

export type Skill = {
  id?: number;
  namaSkill: string;
  kategori: string;
  levelPersen: number;
};

export const getColumns = (
  onEdit: (skill: Skill) => void,
  onDelete: (id: number) => void
): ColumnDef<Skill>[] => [
  { accessorKey: "namaSkill", header: "Nama Skill" },
  { accessorKey: "kategori", header: "Kategori" },
  {
    accessorKey: "levelPersen",
    header: "Level",
    cell: ({ row }) => `${row.original.levelPersen}%`,
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <button onClick={() => onEdit(row.original)} className="text-blue-600 hover:text-blue-800">
          <Pencil size={16} />
        </button>
        <button onClick={() => onDelete(row.original.id!)} className="text-red-600 hover:text-red-800">
          <Trash2 size={16} />
        </button>
      </div>
    ),
  },
];
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import ConfirmDeleteDialog from "@/shared/components/common/confirm-delete-dialog";
import type { Skill } from "@/app/(features)/(root)/portfolio/skills/interfaces/skill";
import { getLevelColor } from "@/app/(features)/(root)/portfolio/skills/hooks/use-skills";

interface GetColumnsArgs {
  onEdit: (skill: Skill) => void;
  onDelete: (id: number) => void;
}

export function getSkillColumns({ onEdit, onDelete }: GetColumnsArgs): ColumnDef<Skill>[] {
  return [
    {
      id: "no",
      header: "No",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "namaSkill",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0 hover:bg-transparent"
        >
          Nama Skill
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "kategori",
      header: "Kategori",
      cell: ({ row }) => <Badge variant="secondary">{row.original.kategori}</Badge>,
    },
    {
      accessorKey: "levelPersen",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0 hover:bg-transparent"
        >
          Level
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const level = row.original.levelPersen || 0;
        return (
          <div className="flex min-w-[160px] items-center gap-3">
            <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div className={`h-full rounded-full ${getLevelColor(level)}`} style={{ width: `${level}%` }} />
            </div>
            <span className="text-xs text-gray-500">{level}%</span>
          </div>
        );
      },
    },
    {
      accessorKey: "tingkat",
      header: "Tingkat",
      cell: ({ row }) => (
        <span className="text-sm text-gray-600 dark:text-gray-300">{row.original.tingkat || "-"}</span>
      ),
    },
    {
      id: "aksi",
      header: "Aksi",
      cell: ({ row }) => {
        const skill = row.original;
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(skill)}>
              Edit
            </Button>
            <ConfirmDeleteDialog
              trigger={<Button size="sm" variant="destructive">Hapus</Button>}
              description={`Skill "${skill.namaSkill}" akan dihapus secara permanen.`}
              onConfirm={() => onDelete(skill.id!)}
            />
          </div>
        );
      },
    },
  ];
}

"use client";

import React, { useEffect, useState } from "react";
import { skillAPI } from "@/lib/api";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ArrowUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Skill {
  id?: number;
  namaSkill: string;
  kategori: string;
  levelPersen: number;
  tingkat?: string;
}

const emptySkill: Skill = {
  namaSkill: "",
  kategori: "",
  levelPersen: 0,
};

const kategoriList = [
  "Backend",
  "Frontend",
  "Database",
  "Tools",
  "Mobile",
  "Soft Skill",
];

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Skill>(emptySkill);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // =========================================================
  // FETCH DATA
  // =========================================================

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await skillAPI.getAll();

      setSkills(res.data || []);
    } catch {
      setError(
        "Gagal memuat data skill. Pastikan backend berjalan."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // =========================================================
  // MODAL
  // =========================================================

  const openAdd = () => {
    setForm({ ...emptySkill });
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (skill: Skill) => {
    setForm({
      ...emptySkill,
      ...skill,
    });

    setEditId(skill.id!);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({ ...emptySkill });
    setEditId(null);
  };

  // =========================================================
  // SAVE
  // =========================================================

  const handleSave = async () => {
    if (!form.namaSkill || !form.kategori) {
      alert("Nama skill dan kategori wajib diisi!");
      return;
    }

    setSaving(true);

    try {
      if (editId) {
        await skillAPI.update(editId, form);
      } else {
        await skillAPI.create(form);
      }

      closeModal();
      await fetchSkills();
    } catch {
      alert("Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus skill ini?")) {
      return;
    }

    try {
      await skillAPI.delete(id);
      await fetchSkills();
    } catch {
      alert("Gagal menghapus data.");
    }
  };

  // =========================================================
  // LEVEL COLOR
  // =========================================================

  const getLevelColor = (level: number) => {
    if (level >= 80) return "bg-green-500";
    if (level >= 60) return "bg-blue-500";
    if (level >= 40) return "bg-yellow-500";

    return "bg-red-400";
  };

  // =========================================================
  // TABLE COLUMNS
  // =========================================================

  const columns: ColumnDef<Skill>[] = [
    {
      id: "no",
      header: "No",
      cell: ({ row }) => {
        return row.index + 1;
      },
    },

    {
      accessorKey: "namaSkill",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(
                column.getIsSorted() === "asc"
              )
            }
            className="px-0 hover:bg-transparent"
          >
            Nama Skill
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },

    {
      accessorKey: "kategori",
      header: "Kategori",

      cell: ({ row }) => {
        const kategori = row.original.kategori;

        return (
          <Badge variant="secondary">
            {kategori}
          </Badge>
        );
      },
    },

    {
      accessorKey: "levelPersen",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(
                column.getIsSorted() === "asc"
              )
            }
            className="px-0 hover:bg-transparent"
          >
            Level
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },

      cell: ({ row }) => {
        const level = row.original.levelPersen || 0;

        return (
          <div className="flex min-w-[160px] items-center gap-3">
            <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className={`h-full rounded-full ${getLevelColor(
                  level
                )}`}
                style={{
                  width: `${level}%`,
                }}
              />
            </div>

            <span className="text-xs text-gray-500">
              {level}%
            </span>
          </div>
        );
      },
    },

    {
      accessorKey: "tingkat",
      header: "Tingkat",

      cell: ({ row }) => {
        return (
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {row.original.tingkat || "-"}
          </span>
        );
      },
    },

    {
      id: "aksi",
      header: "Aksi",

      cell: ({ row }) => {
        const skill = row.original;

        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => openEdit(skill)}
            >
              Edit
            </Button>

            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(skill.id!)}
            >
              Hapus
            </Button>
          </div>
        );
      },
    },
  ];

  // =========================================================
  // TABLE
  // =========================================================

  const table = useReactTable({
    data: skills,
    columns,

    state: {
      sorting,
      globalFilter,
    },

    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    globalFilterFn: "includesString",

    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="p-4 md:p-6">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Keahlian / Skill
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Kelola data keahlian kamu
          </p>
        </div>

        <Button onClick={openAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Skill
        </Button>

      </div>

      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}

      {/* =====================================================
          DATATABLE
      ====================================================== */}

      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">

        {/* SEARCH */}

        <div className="flex items-center justify-between gap-4 border-b p-4">

          <div className="relative w-full max-w-sm">

            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <Input
              placeholder="Cari skill..."
              value={globalFilter}
              onChange={(event) =>
                setGlobalFilter(event.target.value)
              }
              className="pl-9"
            />

          </div>

          <div className="text-sm text-gray-500">
            {table.getFilteredRowModel().rows.length} data
          </div>

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="border-b bg-gray-50 dark:bg-gray-800">

              {table.getHeaderGroups().map(
                (headerGroup) => (
                  <tr key={headerGroup.id}>

                    {headerGroup.headers.map(
                      (header) => (
                        <th
                          key={header.id}
                          className="h-12 px-4 text-left font-medium text-gray-600 dark:text-gray-300"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column
                                  .columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      )
                    )}

                  </tr>
                )
              )}

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={columns.length}
                    className="h-24 text-center text-gray-400"
                  >
                    Memuat data...
                  </td>

                </tr>

              ) : table.getRowModel().rows.length === 0 ? (

                <tr>

                  <td
                    colSpan={columns.length}
                    className="h-24 text-center text-gray-400"
                  >
                    Tidak ada data skill.
                  </td>

                </tr>

              ) : (

                table.getRowModel().rows.map(
                  (row) => (

                    <tr
                      key={row.id}
                      className="border-b transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    >

                      {row.getVisibleCells().map(
                        (cell) => (

                          <td
                            key={cell.id}
                            className="px-4 py-3"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>

                        )
                      )}

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

        {/* =================================================
            PAGINATION
        ================================================== */}

        <div className="flex flex-col gap-4 border-t p-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-2 text-sm text-gray-500">

            <span>
              Baris per halaman
            </span>

            <select
              value={table.getState().pagination.pageSize}
              onChange={(event) => {
                table.setPageSize(
                  Number(event.target.value)
                );
              }}
              className="rounded-md border bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800"
            >
              {[5, 10, 20, 30, 50].map(
                (pageSize) => (
                  <option
                    key={pageSize}
                    value={pageSize}
                  >
                    {pageSize}
                  </option>
                )
              )}
            </select>

          </div>

          <div className="flex items-center gap-6">

            <span className="text-sm text-gray-500">
              Halaman{" "}
              {table.getState().pagination.pageIndex + 1}{" "}
              dari{" "}
              {table.getPageCount() || 1}
            </span>

            <div className="flex items-center gap-1">

              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  table.setPageIndex(0)
                }
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  table.previousPage()
                }
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  table.nextPage()
                }
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  table.setPageIndex(
                    table.getPageCount() - 1
                  )
                }
                disabled={!table.getCanNextPage()}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          MODAL
      ====================================================== */}

      {showModal && (

        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900">

            <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">

              {editId
                ? "Edit Skill"
                : "Tambah Skill"}

            </h2>

            <div className="space-y-4">

              {/* NAMA */}

              <div>

                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nama Skill *
                </label>

                <Input
                  value={form.namaSkill}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      namaSkill: e.target.value,
                    })
                  }
                  placeholder="Contoh: Java, React, MySQL..."
                />

              </div>

              {/* KATEGORI */}

              <div>

                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Kategori *
                </label>

                <select
                  value={form.kategori}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      kategori: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                >

                  <option value="">
                    -- Pilih Kategori --
                  </option>

                  {kategoriList.map(
                    (kategori) => (
                      <option
                        key={kategori}
                        value={kategori}
                      >
                        {kategori}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* LEVEL */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Level
                  </label>

                  <span className="text-sm font-semibold text-blue-600">
                    {form.levelPersen}%
                  </span>

                </div>

                <input
                  type="range"
                  min={0}
                  max={100}
                  value={form.levelPersen}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      levelPersen: Number(
                        e.target.value
                      ),
                    })
                  }
                  className="w-full accent-blue-600"
                />

                <div className="mt-1 flex justify-between text-xs text-gray-400">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>

              </div>

            </div>

            {/* BUTTON */}

            <div className="mt-6 flex justify-end gap-2">

              <Button
                variant="outline"
                onClick={closeModal}
              >
                Batal
              </Button>

              <Button
                onClick={handleSave}
                disabled={saving}
              >
                {saving
                  ? "Menyimpan..."
                  : "Simpan"}
              </Button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
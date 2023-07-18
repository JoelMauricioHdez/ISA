export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Area_Academica: {
        Row: {
          id: number
          nombre: string | null
        }
        Insert: {
          id?: number
          nombre?: string | null
        }
        Update: {
          id?: number
          nombre?: string | null
        }
        Relationships: []
      }
      Asignatura: {
        Row: {
          area_academica: number
          codigo_asignatura: string
          id: number
        }
        Insert: {
          area_academica: number
          codigo_asignatura: string
          id?: number
        }
        Update: {
          area_academica?: number
          codigo_asignatura?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "Asignatura_area_academica_fkey"
            columns: ["area_academica"]
            referencedRelation: "Area_Academica"
            referencedColumns: ["id"]
          }
        ]
      }
      Carrera: {
        Row: {
          id: number
          nombre: string | null
        }
        Insert: {
          id?: number
          nombre?: string | null
        }
        Update: {
          id?: number
          nombre?: string | null
        }
        Relationships: []
      }
      Estudiante: {
        Row: {
          apellido: string | null
          carrera: number | null
          correo_institucional: string
          id: number
          id_estudiante: string | null
          nombre: string | null
          pensum: string
          uuid: string | null
        }
        Insert: {
          apellido?: string | null
          carrera?: number | null
          correo_institucional: string
          id?: number
          id_estudiante?: string | null
          nombre?: string | null
          pensum?: string
          uuid?: string | null
        }
        Update: {
          apellido?: string | null
          carrera?: number | null
          correo_institucional?: string
          id?: number
          id_estudiante?: string | null
          nombre?: string | null
          pensum?: string
          uuid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Estudiante_carrera_fkey"
            columns: ["carrera"]
            referencedRelation: "Carrera"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Estudiante_uuid_fkey"
            columns: ["uuid"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      Inconvenientes: {
        Row: {
          asignatura: number
          descripcion: string | null
          estudiante: number
          tipo_inconveniente: number | null
          trimestre: string | null
        }
        Insert: {
          asignatura: number
          descripcion?: string | null
          estudiante: number
          tipo_inconveniente?: number | null
          trimestre?: string | null
        }
        Update: {
          asignatura?: number
          descripcion?: string | null
          estudiante?: number
          tipo_inconveniente?: number | null
          trimestre?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Inconvenientes_asignatura_fkey"
            columns: ["asignatura"]
            referencedRelation: "Asignatura"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Inconvenientes_estudiante_fkey"
            columns: ["estudiante"]
            referencedRelation: "Estudiante"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Inconvenientes_tipo_inconveniente_fkey"
            columns: ["tipo_inconveniente"]
            referencedRelation: "Tipo_Inconveniente"
            referencedColumns: ["id"]
          }
        ]
      }
      Tipo_Inconveniente: {
        Row: {
          id: number
          nombre: string | null
        }
        Insert: {
          id?: number
          nombre?: string | null
        }
        Update: {
          id?: number
          nombre?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

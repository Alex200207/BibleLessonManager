export interface kids {
  id: number;
  nombre: string;
  edad: number;
  id_maestra: number;
  genero: string;
  grupo_id: number;
  deleted_at?: Date;
}

export interface lesson {
  id: number;
  tema: string;
  descripcion: string;
  pasaje_biblico: string;
  id_maestra: number;
  id_grupo: number;
}

export interface score {
  id: number;
  estudiante_id: number;
  fecha: Date;
  puntuacion: number;
}
export interface group {
  id: number;
  nombre: string;
  descripcion: string;
}
export interface users {
  id: number;
  name: string;
  email: string;
  password: string;
}
// types.ts
export interface Role {
  id: number;
  name: string;
  guard: string;
  permissions: Permission[];
}

export interface Permission {
  id: number;
  name: string;
  enabled: boolean;
}

export interface Role {
  id: number;
  name: string;
  deleted_at?: Date;
  updated_at?: Date;
}

export interface kids {
  id: number;
  nombre: string;
  edad: number;
  genero: string;
  grupo_id: number;
  deleted_at?: Date;
  progreso: number;
  fecha?: Date;
}

export interface lesson {
  id: number;
  tema: string;
  descripcion: string;
  pasaje_biblico: string;
  estado: number;
  fecha_inicio?: Date;
  fecha_fin?: Date;
  grupo_id?: number | null;
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
  deleted_at?: Date;
  maestro_id: number | null;
}
export interface users {
  id: number;
  name: string;
  email: string;
  password?: string;
  deleted_at?: Date;
  updated_at?: Date;
  role_id: number;
  role: string; // Add the role property
}
// types.ts
export interface Role {
  id: number;
  name: string;
  guard: string;
  permissions: Permission[];
  updated_at?: Date;
}

export interface Permission {
  id: number;
  name: string;
  guard: string;
  deleted_at?: Date;
  updated_at?: Date;
  enabled: boolean; // Nuevo campo para marcar si está habilitado
}
export interface PermissionResponse {
  hasPermission: boolean;
  // Otros campos que pueda incluir la respuesta
}
export interface Role {
  id: number;
  name: string;
  guard: string;
  deleted_at?: Date;
  updated_at?: Date;
  permissions: Permission[]; // Relación con los permisos
}
export interface Cuestionario {
  id: number;
  evaluacion_id: number;
  pregunta: string;
  respuesta_correcta: string;
}

export interface Evaluaciones {
  id: number;
  maestro_id: number;
  leccion_id: number;
  titulo: string;
  descripcion: string;
  tipo_evaluacion_id: number;
  fecha_creacion?: Date;
  cuestionarios: Cuestionario[]; // Añadir una copia del type Cuestionario
}

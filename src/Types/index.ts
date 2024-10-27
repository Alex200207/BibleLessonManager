export interface kids {
    id: number;
    nombre: string;
    edad: number;
    id_maestra: number;
    genero: string;
    grupo_id: number;
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
    id:number;
    name: string;
    email: string;
    password: string;
  }
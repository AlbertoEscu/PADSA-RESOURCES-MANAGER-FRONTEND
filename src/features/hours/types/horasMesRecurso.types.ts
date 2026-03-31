export interface HorasMesRecursoDto {
  id: number;            // 👈 necesario para DataTable
  idHoras: number

  numeroPersonal: string
  nombrePersonal: string

  anio: number
  mes: number

  horasSemana1: number
  horasSemana2: number
  horasSemana3: number
  horasSemana4: number
  horasSemana5: number

  horasVacaciones: number
  horasMes: number

  fechaUltimaModificacion: string
  usuarioModificacion: string

}

export interface SaveHorasMesRecursoDto {

  idHoras: number

  numeroPersonal: string
  nombrePersonal: string

  anio: number
  mes: number

  horasSemana1: number
  horasSemana2: number
  horasSemana3: number
  horasSemana4: number
  horasSemana5: number

  horasVacaciones: number
  horasMes: number

  usuarioModificacion: string

}
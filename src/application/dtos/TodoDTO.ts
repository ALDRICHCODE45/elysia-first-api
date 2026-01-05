/**
 * DTO para representar un Todo en la capa de aplicación
 */
export interface TodoDTO {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

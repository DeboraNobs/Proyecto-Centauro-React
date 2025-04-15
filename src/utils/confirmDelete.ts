import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const confirmarEliminacion = async (mensaje: string = "¿Está seguro de que desea eliminar?") => {
  const result = await MySwal.fire({
    title: mensaje,
    text: "Esta acción es irreversible.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });

  return result.isConfirmed;
};

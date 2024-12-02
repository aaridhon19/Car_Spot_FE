import Swal from "sweetalert2";

export const showErrorAlert = (title) => {
    Swal.fire({
        icon: "error",
        title,
        confirmButtonText: "Back",
        confirmButtonColor: "rgb(251, 27, 27)",
    });
}

export const showSuccessAlert = (title, text) => {
    Swal.fire({
        icon: "success",
        title,
        text,
        confirmButtonText: "Back",
        confirmButtonColor: "rgb(7, 219, 103)",
    });
}

export const showConfirmAlert = (title, onConfirm) => {
    Swal.fire({
        title,
        showCancelButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: "rgb(7, 219, 103)",
        cancelButtonText: "No",
        cancelButtonColor: "rgb(251, 27, 27)",
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();
        }
    });
}
import imgService from "./img-service";

// This function needs an image as a parameter and return the URL of the image uploaded to S3 bucket
export const uploadImage = async (
    file: File,
    endpoint: string = "/img",
) : Promise<string> => {

    if (!file) throw new Error('No se proporcionó ninguna imagen.');

    const formData = new FormData();
    formData.append("image", file);

    try {
        const res = await imgService.post(endpoint, formData);
        return res.data.url;
    } catch (err) {
        console.error("Error al subir la imagen:", err);
        throw new Error("Error al subir la imagen.");

    }
}
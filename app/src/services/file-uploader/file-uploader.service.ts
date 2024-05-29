import axios from "../../axios/instance";

export class FileUploaderService {
	static async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await axios.post("uploader/image", formData)
    return data;  
	}
}
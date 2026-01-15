import { ImageSourcePropType } from "react-native";

const BASE_URL = "http://192.168.1.247:3000"
const DEFAULT_IMAGE = require("../assets/images/Group 34.jpg");

export const getImageSource = (
    image: string | null
): ImageSourcePropType => {
    if(!image){
        return DEFAULT_IMAGE;
    }
    if (image.startsWith("/uploads")){
        return { uri: `${BASE_URL}${image}`};
    }
    return { uri: `${BASE_URL}/uploads/${image}`}
}
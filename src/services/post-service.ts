import axios from "axios";

const POST_BASE_URL = "http://localhost:8080/api/v1/postage"

type PostPayload = {
    title: string,
    content: string,
    author: string
}

class PostService {
    getAll() {
        return axios.get(POST_BASE_URL);
    }

    create({title, content, author} : PostPayload) {
        return axios.post(POST_BASE_URL, {title, content, author});
    }
}

export default new PostService();
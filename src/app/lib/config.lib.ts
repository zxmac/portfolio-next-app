import nextConfig from "../../../next.config"

export default function getConfig() {
    const env = nextConfig.env ?? {}
    return {
        apiUrl: env.API_URL
    }
}
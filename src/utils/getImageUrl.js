export const getImageUrl = (path) => {
    if (!path) return "/assets/images/detail/image4.jpg";

    // already absolute URL (Cloudinary, Unsplash, CDN)
    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
    }

    // relative path from Django backend
    return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
};

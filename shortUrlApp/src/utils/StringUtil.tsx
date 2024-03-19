export const validateURL = (url: string): boolean => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
}

export const extractTokenFromURL = (url: string): string => {
    const parts = url.split('/');
    if (parts.length < 2) {
        return "";
    }
    return sanityzeUrlToken(parts[parts.length - 1]);
}

export const sanityzeUrlToken = (urlToken: string): string => {
    return urlToken.replace(/[^a-zA-Z0-9]/g, '');
}
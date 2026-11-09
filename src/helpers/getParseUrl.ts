interface getParseUrlProps {
    originalName: string | undefined;
    city?: string;
}

const getParseUrl = ({originalName, city}: getParseUrlProps) => {
    if (!originalName) return null;

    const fullName = city ? `${originalName} ${city}` : originalName;
    const encodedFullName = encodeURI(fullName);

    return `https://www.google.com/maps/search/?api=1&query=${encodedFullName}`;
};

export default getParseUrl;

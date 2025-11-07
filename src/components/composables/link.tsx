export function Link({ link, name }: { link: string; name: string }) {
    return (
        <span>
            <a href={link}>{name}</a>
        </span>
    );
}

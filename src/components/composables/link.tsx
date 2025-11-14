export function Link({ link, name }: { link: string; name: string }) {
    return (
        <a href={link} className="link bagel-fat-one-regular">
            {name}
        </a>
    );
}

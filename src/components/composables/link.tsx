export function Link({ link, name }: { link: string; name: string }) {
    const css = `${link}--link tab bai-jamjuree-regular`;
    return (
        <a href={'/' + link} className={css}>
            {name}
        </a>
    );
}

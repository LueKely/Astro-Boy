export function Link({ link, name }: { link: string; name: string }) {
    const css = `${link}--link  bai-jamjuree-regular link  `;
    return (
        <a href={'/' + link} className={css}>
            {name}
        </a>
    );
}

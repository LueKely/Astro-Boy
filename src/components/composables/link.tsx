export function Link({ link, name }: { link: string; name: string }) {
    const css = `${link}--link  bagel-fat-one-regular `;
    return (
        <a href={'/' + link} className={css}>
            {name}
        </a>
    );
}

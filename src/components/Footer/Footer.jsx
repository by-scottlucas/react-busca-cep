import './Footer.css';

export default function Footer() {
    const links = [
        { label: "Lucas Scott", url: "https://melinks.netlify.app/" },
        { label: "LukeCode", url: "https://lukecodedev.netlify.app/" },
    ];

    return (
        <footer className="footer">
            <span className="footer-label footer-label--default">
                2024 - {new Date().getFullYear()} • Desenvolvido por{" "}
            </span>

            {links.map((link, index) => (
                <span key={link.url}>
                    <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-label footer-label--link"
                    >
                        {link.label}
                    </a>
                    {index < links.length - 1 && " • "}
                </span>
            ))}
        </footer>
    );
}

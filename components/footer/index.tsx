import React from "react"

type FooterText = {
    content: string;
}

const FooterText: React.FC<FooterText> = ( {content} ) => {
    return (<p>
        {content}
    </p>)
}

export default function Footer() {
    return (
        <div>
            Footer
            <FooterText content={'Who am i?'} />
        </div>
    )
}
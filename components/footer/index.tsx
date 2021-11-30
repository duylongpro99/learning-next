import React from "react";
import Image from 'next/image';
import theGardenOfWord from  '../../assets/images/thegardenofwords.jpeg';

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
            <Image src={theGardenOfWord} />
            <FooterText content={'Who am i?'} />
        </div>
    )
}
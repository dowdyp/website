import figmaLogo from "@svgs/figma-logo.svg"
import { SvgAnchor } from "../SvgElem"
const figmaUrl = "https://www.figma.com/design/fRfkiCRJcA0nvQQJzdSvv6"

export const Footer = () => {

    return <footer>
        <SvgAnchor src={figmaLogo} size="sm" href={figmaUrl} target="_blank" title="Figma Logo" />
    </footer>
}
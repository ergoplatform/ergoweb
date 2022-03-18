import Link from "next/link"
import { FormattedMessage } from "react-intl"
import { getIconComponentByName } from "../utils/icons-map"
import { BpsaaLogo, LogoWithText } from "./icons"

export default function Footer() {
    return (
        <footer>
            <div className="max-w-[1300px] mx-auto py-12 px-4">
                <div className="md:flex justify-between">
                    <div className="my-6 md:my-auto flex justify-center">
                        <Link href='/'><button><LogoWithText viewBox="0 0 213 82" className='w-40 md:w-52' /></button></Link>
                    </div>
                    <div className="grid overflow-hidden grid-cols-3 gap-2 text-red md:grid-cols-3 lg:grid-cols-10">
                        <div className="box mx-auto my-auto"><a href="https://sigmaverse.io" target="_blank" rel="noreferrer" >{getIconComponentByName('Sigmaverse')}</a></div>
                        <div className="box mx-auto my-auto"><a href="https://ergonaut.space" target="_blank" rel="noreferrer" >{getIconComponentByName('Ergonaut')}</a></div>
                        <div className="box mx-auto my-auto"><a href="https://github.com/ergoplatform" target="_blank" rel="noreferrer" >{getIconComponentByName('Github')}</a></div>
                        <div className="box mx-auto my-auto"><a href="https://twitter.com/ergoplatformorg" target="_blank" rel="noreferrer" >{getIconComponentByName('Twitter')}</a></div>
                        <div className="box mx-auto my-auto"><a href="https://www.youtube.com/c/ErgoPlatform" target="_blank" rel="noreferrer" >{getIconComponentByName('Youtube')}</a></div>
                        <div className="box mx-auto my-auto"><a href="https://t.me/ergoplatform" target="_blank" rel="noreferrer" >{getIconComponentByName('Telegram')}</a></div>
                        <div className="box mx-auto my-auto"><a href="https://discord.gg/RC8M4Bkgsy" target="_blank" rel="noreferrer" >{getIconComponentByName('Discord')}</a></div>
                        <div className="box mx-auto my-auto"><a href="https://reddit.com/r/ergonauts" target="_blank" rel="noreferrer" >{getIconComponentByName('Reddit')}</a></div>
                        <div className="box mx-auto my-auto"><a href="https://sigmaverse.io" target="_blank" rel="noreferrer">{getIconComponentByName('Wechat')}</a></div>
                    </div>
                    <div className="my-6 md:my-auto flex justify-center">
                        <a className="text-brand-orange dark:text-brand-orange" href="mailto:team@ergoplatform.org">team@ergoplatform.org</a>
                    </div>
                </div>
                <div className="my-6 grid md:grid-cols-2 lg:grid-cols-6">
                    <div className="mx-1"><h3 className="font-button text-[#585858] dark:text-[#989898] my-4"><FormattedMessage defaultMessage="COMMUNITY" id="footer.community.title" /></h3>
                        <ul className="hidden md:block">
                            <li><a href="https://linktr.ee/ergoplatform" target="_blank" rel="noreferrer"><FormattedMessage defaultMessage="Join our channels" id="footer.community.1" /></a></li>
                            <li><a href="https://ergonaut.space/en/Ergo/Contributing" target="_blank" rel="noreferrer"><FormattedMessage defaultMessage="Sigmanauts" id="footer.community.2" /></a></li>
                            <li><a href="https://ergonaut.space/en/Ergo/Contributing" target="_blank" rel="noreferrer"><FormattedMessage defaultMessage="Contribute to Ergo" id="footer.community.3" /></a></li>
                            <li><a href="https://sigmaverse.io" target="_blank" rel="noreferrer"><FormattedMessage defaultMessage="Ergo Foundation" id="footer.community.4" /></a></li>
                        </ul>
                    </div>
                    <div className="mx-1"><h3 className="font-button text-[#585858] dark:text-[#989898] my-4"><FormattedMessage defaultMessage="GET ERG" id="footer.getErg.title" /></h3>
                        <ul className="hidden md:block">
                            <li><Link href="/get-erg"><a><FormattedMessage defaultMessage="Mining" id="footer.getErg.1" /></a></Link></li>
                            <li><Link href="/get-erg"><a><FormattedMessage defaultMessage="Mining Calculator" id="footer.getErg.2" /></a></Link></li>
                            <li><Link href="/get-erg"><a><FormattedMessage defaultMessage="Wallets" id="footer.getErg.3" /></a></Link></li>
                            <li><Link href="/get-erg"><a><FormattedMessage defaultMessage="Exchanges" id="footer.getErg.4" /></a></Link></li>
                        </ul>
                    </div>
                    <div className="mx-1"><h3 className="font-button text-[#585858] dark:text-[#989898] my-4"><FormattedMessage defaultMessage="DISCOVER" id="footer.discover.title" /></h3>
                        <ul className="hidden md:block">
                            <li><a href="http://docs.ergoplatform.org/" target="_blank" rel="noreferrer"><FormattedMessage defaultMessage="Documentation" id="footer.discover.1" /></a></li>
                            <li><a href="https://docs.ergoplatform.com/contribute/" target="_blank" rel="noreferrer"><FormattedMessage defaultMessage="Grants & Bounties" id="footer.discover.2" /></a></li>
                            <li><Link href="/discover"><a><FormattedMessage defaultMessage="FAQ" id="footer.discover.3" /></a></Link></li>
                            <li><a href="https://explorer.ergoplatform.com/" target="_blank" rel="noreferrer"><FormattedMessage defaultMessage="Ergo Explorer" id="footer.discover.4" /></a></li>
                            <li><Link href="/discover"><a><FormattedMessage defaultMessage="Documents" id="footer.discover.5" /></a></Link></li>
                        </ul>
                    </div>
                    <div className="mx-1"><h3 className="font-button text-[#585858] dark:text-[#989898] my-4"><FormattedMessage defaultMessage="ECOSYSTEM" id="footer.ecosystem.title" /></h3>
                        <ul className="hidden md:block">
                            <li><a href="https://sigmaverse.io" target="_blank" rel="noreferrer"><FormattedMessage defaultMessage="DApps" id="footer.ecosystem.1" /></a></li>
                            <li><Link href="/discover"><a><FormattedMessage defaultMessage="Roadmap" id="footer.ecosystem.2" /></a></Link></li>
                            <li><a href="https://ergonaut.space" target="_blank" rel="noreferrer"><FormattedMessage defaultMessage="Ergonaut" id="footer.ecosystem.3" /></a></li>
                            <li><a href="http://ergoraffle.com/" target="_blank" rel="noreferrer"><FormattedMessage defaultMessage="Ergo Raffle" id="footer.ecosystem.4" /></a></li>
                            <li><Link href="/ecosystem"><a><FormattedMessage defaultMessage="Real Life Ergo" id="footer.ecosystem.5" /></a></Link></li>
                        </ul>
                    </div>
                    <div className="mx-1"><h3 className="font-button text-[#585858] dark:text-[#989898] my-4"><FormattedMessage defaultMessage="BLOG" id="footer.blog.title" /></h3></div>
                    <div className="mx-1"><h3 className="font-button text-[#585858] dark:text-[#989898] my-4"><FormattedMessage defaultMessage="NEWS" id="footer.news.title" /></h3></div>
                </div>
                <div className="md:flex">
                    <div className="my-6 order-2">{<BpsaaLogo viewBox="0 0 227 102" width="158" height="88" />}</div>
                    <div className="flex-grow md:flex-grow my-auto">
                        <ul className="inline-flex">
                            <li className="mr-6">Ergo Platformx &copy; {new Date().getFullYear()}</li>
                            <li className="mr-6"><Link href={'/privacy-policy'}><a><FormattedMessage defaultMessage="Privacy Policy" id="footer.privacyPolicy" /></a></Link></li>
                            <li className="mr-6"><Link href={'/legal'}><a><FormattedMessage defaultMessage="Legal" id="footer.legal" /></a></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}